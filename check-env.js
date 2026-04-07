import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

console.log('ANTHROPIC_AUTH_TOKEN:', process.env.ANTHROPIC_AUTH_TOKEN);
console.log('ANTHROPIC_BASE_URL:', process.env.ANTHROPIC_BASE_URL);
console.log('ANTHROPIC_MODEL:', process.env.ANTHROPIC_MODEL);
console.log('ANTHROPIC_DEFAULT_SONNET_MODEL:', process.env.ANTHROPIC_DEFAULT_SONNET_MODEL);
console.log('ANTHROPIC_DEFAULT_OPUS_MODEL:', process.env.ANTHROPIC_DEFAULT_OPUS_MODEL);
console.log('ANTHROPIC_DEFAULT_HAIKU_MODEL:', process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL);
console.log('ANTHROPIC_SMALL_FAST_MODEL:', process.env.ANTHROPIC_SMALL_FAST_MODEL);
console.log('API_TIMEOUT_MS:', process.env.API_TIMEOUT_MS);