import Stripe from 'stripe';
import express from 'express';
import config from '../config.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { transporter, payOrderEmailTemplate } from '../utils.js';

const stripe = Stripe(config.STRIPE_SECRET_KEY);

const stripeRouter = express.Router();

stripeRouter.get('/secret/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      '_id name email'
    );

    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalPrice * 100,
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' },
    });

    // Update order to mark it as paid
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      update_time: paymentIntent.created,
      email_address: order.user.email,
    };

    // Update count in stock
    for (const index in order.orderItems) {
      const item = order.orderItems[index];
      const product = await Product.findById(item.product);
      product.countInStock -= 1;
      product.sold += item.quantity;
      await product.save();
    }
    // end count in stock

    // Send email to the customer
    const customerEmail = order.user.email;
    const purchaseDetails = payOrderEmailTemplate(order);

    // Create email content
    const emailContent = {
      from: 'exoticwoodpen@gmail.com',
      to: customerEmail,
      subject: 'Stripe Purchase Receipt from exoticwoodpen.com',
      html: purchaseDetails,
    };

    try {
      // Send the email using the `transporter`
      const info = await transporter.sendMail(emailContent);

      console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    await order.save();

    res.send({ order, client_secret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: 'Failed to retrieve client secret' });
  }
});

stripeRouter.get('/key', (req, res) => {
  res.send(config.STRIPE_PUBLISHABLE_KEY);
});

export default stripeRouter;
