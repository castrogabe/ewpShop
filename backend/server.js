import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import config from './config.js';
import seedRouter from './routes/seedRoutes.js';
import stripeRouter from './routes/stripeRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import cors from 'cors';

const __dirname = path.resolve();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID || 'sb');
});

app.use(
  cors({
    // origin: 'http://localhost:3000',  testing
    origin: 'http://146.190.132.25', // deployment
    credentials: true,
  })
);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// routes
app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/stripe', stripeRouter);
app.use(messageRouter);

// For any other routes, serve the index.html file from the frontend build directory
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = config.PORT || 8000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
