import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 8000,
  MONGODB_URL: process.env.MONGODB_URI || 'mongodb://localhost/frontend',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key',
  STRIPE_PUBLISHABLE_KEY:
    process.env.STRIPE_PUBLISHABLE_KEY || 'your_stripe_publishable_key',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
  auth: process.env.NODE_USER || 'username',
  auth: process.env.NODE_PASSWORD || 'password',
};
