import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || 'newsecretword',
  MONGODB_URL: process.env.MONGODB_URI || 'mongodb://localhost/frontend',

  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',

  STRIPE_PUBLISHABLE_KEY:
    process.env.STRIPE_PUBLISHABLE_KEY || 'your_stripe_publishable_key',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key',

  CLOUDINARY_CLOUD_NAME: 'penshop',
  CLOUDINARY_API_KEY: process.env.key || 'apiKey',
  CLOUDINARY_URL: process.env.cloudinary || 'secretKey',
  CLOUDINARY_API_SECRET: process.envCloudinary || 'secretAccessKey',

  auth: process.env.NODE_USER,
  auth: process.env.NODE_PASSWORD,
};
