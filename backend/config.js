import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || 'newsecretword',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  MONGODB_URL: process.env.MONGODB_URI || 'mongodb://localhost/frontend',

  AWS_ACCESS_KEY_ID: process.env.accessKeyId || 'accessKeyId',
  AWS_SECRET_ACCESS_KEY: process.env.secretAccessKey || 'secretAccessKey',

  CLOUDINARY_CLOUD_NAME: 'penshop',
  CLOUDINARY_API_KEY: process.env.key || 'apiKey',
  CLOUDINARY_URL: process.env.cloudinary || 'secretKey',
  CLOUDINARY_API_SECRET: process.envCloudinary || 'secretAccessKey',

  STRIPE_PUBLISHABLE_KEY:
    process.env.STRIPE_PUBLISHABLE_KEY || 'your_stripe_publishable_key',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key',

  auth: process.env.NODE_USER,
  auth: process.env.NODE_PASSWORD,
};
