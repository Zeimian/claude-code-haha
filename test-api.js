import Anthropic from '@anthropic-ai/sdk';

// 从环境变量获取配置
const apiKey = process.env.ANTHROPIC_AUTH_TOKEN || 'sk-sp-4e00e7f2f2bb42eda7eeb8782be4ccf5';
const baseUrl = process.env.ANTHROPIC_BASE_URL || 'https://ai.ltcraft.cn:12000';
const model = process.env.ANTHROPIC_MODEL || 'qwen3-coder-plus';

console.log('Testing API connection...');
console.log('Base URL:', baseUrl);
console.log('Model:', model);

const anthropic = new Anthropic({
  apiKey: apiKey,
  baseURL: baseUrl,
});

try {
  console.log('Sending test message...');
  
  const message = await anthropic.messages.create({
    model: model,
    max_tokens: 100,
    messages: [
      {
        role: 'user',
        content: 'Hello, please respond in Chinese. What model are you?'
      }
    ]
  });
  
  console.log('Response received:');
  console.log(message);
} catch (error) {
  console.error('Error occurred:', error.message);
  console.error('Error type:', error.constructor.name);
  if (error.cause) {
    console.error('Error cause:', error.cause);
  }
}