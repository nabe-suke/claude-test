const https = require('https');
const fs = require('fs');

async function callClaudeAPI(prompt, apiKey) {
  const requestBody = {
    model: "claude-3-5-sonnet-20241022",
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

async function generateWebsite(issueTitle, issueBody, apiKey) {
  // 文字列を安全にクリーニング
  const cleanTitle = (issueTitle || '').replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ').trim();
  const cleanBody = (issueBody || '').replace(/\\n/g, ' ').replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ').trim();
  
  const prompt = `You are a web designer for D's tech. Create a complete HTML website based on the following requirements.

## Company Information
- Company: D's tech
- Location: Ami-machi, Ibaraki Prefecture
- Price: 10,000 yen per month (tax included)
- Feature: Careful support unique to individual business owners

## Requirements
Title: ${cleanTitle}
Content: ${cleanBody}

## Output Requirements
- Complete HTML (including CSS and JavaScript)
- Responsive design
- Modern and beautiful design
- Include D's tech information appropriately
- Implement functions according to requirements

Output only HTML code (no explanations needed):`;

  try {
    const htmlContent = await callClaudeAPI(prompt, apiKey);
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
  const apiKey = process.env.ANTHROPIC_API_KEY;

  console.log('Environment variables:');
  console.log('ISSUE_TITLE:', JSON.stringify(issueTitle));
  console.log('ISSUE_BODY:', JSON.stringify(issueBody));
  console.log('API_KEY present:', !!apiKey);

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required');
  }

  console.log('Claude APIを呼び出してウェブサイトを生成中...');
  const htmlContent = await generateWebsite(issueTitle, issueBody, apiKey);
  
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