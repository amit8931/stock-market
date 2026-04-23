import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // App
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  
  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_NAME: process.env.DB_NAME || 'stock_platform',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',
  
  // Redis
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
  
  // APIs
  FINNHUB_KEY: process.env.FINNHUB_KEY || '',
  POLYGON_KEY: process.env.POLYGON_KEY || '',
  OPENAI_KEY: process.env.OPENAI_KEY || '',
  
  // Services
  API_GATEWAY_URL: process.env.API_GATEWAY_URL || 'http://localhost:3000',
  MARKET_SERVICE_URL: process.env.MARKET_SERVICE_URL || 'http://localhost:3001',
  SIGNAL_ENGINE_URL: process.env.SIGNAL_ENGINE_URL || 'http://localhost:3002',
  AI_ENGINE_URL: process.env.AI_ENGINE_URL || 'http://localhost:3003',
  WEBSOCKET_SERVICE_URL: process.env.WEBSOCKET_SERVICE_URL || 'ws://localhost:3004',
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || 'http://localhost:3005',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
};

export default config;
