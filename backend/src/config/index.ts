import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  api: {
    port: parseInt(process.env.PORT || '3000'),
    version: process.env.API_VERSION || 'v1',
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? process.env.CORS_ORIGINS?.split(',') || []
          : ['http://localhost:3000', 'http://localhost:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    },
  },
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10'),
  },
};
