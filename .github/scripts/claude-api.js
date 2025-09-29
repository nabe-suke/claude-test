const https = require('https');
const fs = require('fs');

async function callClaudeAPI(prompt, apiKey) {
  const data = JSON.stringify({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const options = {
    hostname: 'api.anthropic.com',
    port: 443,
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Length': data.length
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

    req.write(data);
    req.end();
  });
}

async function generateWebsite(issueTitle, issueBody, apiKey) {
  const prompt = `
あなたはD's techのウェブデザイナーです。以下の要望に基づいて、完全なHTMLウェブサイトを作成してください。

## 会社情報
- 会社名: D's tech
- 事業地: 茨城県阿見町
- 料金: 月額1万円（税込）
- 特徴: 個人事業主ならではの丁寧なサポート

## 要望
タイトル: ${issueTitle}
内容: ${issueBody}

## 出力要件
- 完全なHTML（CSS、JavaScriptを含む）
- レスポンシブデザイン
- モダンで美しいデザイン
- D's techの情報を適切に含める
- 要望に応じた機能を実装

HTMLコードのみを出力してください（説明文は不要）：
`;

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