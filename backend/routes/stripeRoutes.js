import Stripe from 'stripe';
import express from 'express';
import config from '../config.js';
import Order from '../models/orderModel.js';

const stripe = Stripe(config.STRIPE_SECRET_KEY);

const stripeRouter = express.Router();
stripeRouter.get('/secret/:id', async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    '_id name email'
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.totalPrice * 100,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: 'accept_a_payment' },
  });
  res.send({ order, client_secret: paymentIntent.client_secret });
});

stripeRouter.get('/key', (req, res) => {
  res.send(config.STRIPE_PUBLISHABLE_KEY);
});

export default stripeRouter;
