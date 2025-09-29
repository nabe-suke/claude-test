const https = require('https');
const fs = require('fs');

async function callClaudeAPI(prompt, apiKey) {
  const requestBody = {
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  };
  
  const data = JSON.stringify(requestBody);
  const dataBuffer = Buffer.from(data, 'utf8');
  console.log('Request Body Length:', dataBuffer.length);
  console.log('Request Body Preview:', data.substring(0, 200) + '...');

  const options = {
    hostname: 'api.anthropic.com',
    port: 443,
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Length': dataBuffer.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response Data:', responseData);
        
        try {
          const response = JSON.parse(responseData);
          console.log('Parsed Response:', JSON.stringify(response, null, 2));
          
          if (response.content && response.content[0] && response.content[0].text) {
            resolve(response.content[0].text);
          } else if (response.error) {
            reject(new Error(`API Error: ${response.error.message || response.error.type}`));
          } else {
            reject(new Error(`Invalid response format: ${JSON.stringify(response)}`));
          }
        } catch (error) {
          reject(new Error(`JSON Parse Error: ${error.message}. Raw response: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(dataBuffer);
    req.end();
  });
}

async function generateWebsite(issueTitle, issueBody, claudeSpecs, apiKey) {
  // 文字列を安全にクリーニング
  const cleanTitle = (issueTitle || '').replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ').trim();
  const cleanBody = (issueBody || '').replace(/\\n/g, ' ').replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ').trim();
  const specs = claudeSpecs || '';
  
  const prompt = `You are a web designer for D's tech. Follow the specifications below strictly.

## Project Specifications
${specs}

## Current Request
Title: ${cleanTitle}
Content: ${cleanBody}

## ABSOLUTE RULES - FOLLOW EXACTLY
- If request mentions ONLY "footer": Create standard D's tech website with the footer modification ONLY
- If request mentions ONLY "header": Create standard D's tech website with the header modification ONLY  
- If request mentions ONLY "pricing": Create standard D's tech website with the pricing modification ONLY
- NEVER modify multiple sections unless explicitly requested
- ALWAYS include all required D's tech information in standard layout
- Make MINIMAL changes - only what is specifically requested

Output complete HTML file with ONLY the requested modifications:`;

  try {
    const rawContent = await callClaudeAPI(prompt, apiKey);
    
    // マークダウン記法を除去してHTMLコンテンツを抽出
    let htmlContent = rawContent;
    
    // ```html で始まり ``` で終わる場合の処理
    if (htmlContent.includes('```html')) {
      const startIndex = htmlContent.indexOf('```html') + 7;
      const endIndex = htmlContent.lastIndexOf('```');
      if (endIndex > startIndex) {
        htmlContent = htmlContent.substring(startIndex, endIndex);
      }
    }
    
    // ``` で始まり ``` で終わる場合の処理
    else if (htmlContent.startsWith('```') && htmlContent.endsWith('```')) {
      const lines = htmlContent.split('\n');
      lines.shift(); // 最初の ``` 行を削除
      lines.pop();   // 最後の ``` 行を削除
      htmlContent = lines.join('\n');
    }
    
    // 前後の空白を除去
    htmlContent = htmlContent.trim();
    
    console.log('HTML content extracted, length:', htmlContent.length);
    return htmlContent;
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
}

// メイン実行
async function main() {
  const issueTitle = process.env.ISSUE_TITLE;
  const issueBody = process.env.ISSUE_BODY;
  const claudeSpecsB64 = process.env.CLAUDE_SPECS_B64;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Base64デコード
  let claudeSpecs = '';
  if (claudeSpecsB64) {
    try {
      claudeSpecs = Buffer.from(claudeSpecsB64, 'base64').toString('utf8');
    } catch (error) {
      console.error('CLAUDE.mdデコードエラー:', error);
    }
  }

  console.log('Environment variables:');
  console.log('ISSUE_TITLE:', JSON.stringify(issueTitle));
  console.log('ISSUE_BODY:', JSON.stringify(issueBody));
  console.log('CLAUDE_SPECS present:', !!claudeSpecs);
  console.log('API_KEY present:', !!apiKey);

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required');
  }

  console.log('Claude APIを呼び出してウェブサイトを生成中...');
  const htmlContent = await generateWebsite(issueTitle, issueBody, claudeSpecs, apiKey);
  
  // HTMLファイルを保存
  fs.mkdirSync('preview', { recursive: true });
  fs.writeFileSync('preview/index.html', htmlContent);
  
  console.log('ウェブサイト生成完了');
}

if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
}

module.exports = { generateWebsite };