import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import Subscriber from '../models/Subscriber.js';
import express from 'express';

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: 'Amount is required' });

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, 
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

export const createStripeSession = async (req, res) => {
  try {
    const { plan, name, email } = req.body;
    const PLAN_PRICES = {
      monthly: { amount: 29900, label: 'Monthly Subscription' },
      annually: { amount: 99900, label: 'Annual Subscription' },
    };
    if (!plan || !PLAN_PRICES[plan]) {
      return res.status(400).json({ message: 'Invalid plan selected' });
    }
    
    const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: PLAN_PRICES[plan].label,
            },
            unit_amount: PLAN_PRICES[plan].amount,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${FRONTEND_URL}/thankyou`,
      cancel_url: `${FRONTEND_URL}/signup`,
      metadata: {
        name,
        plan,
      },
    });
    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Stripe session', error: error.message });
  }
};


export const stripeWebhookHandler = async (req, res) => {
  let event;
  const endpointSecret = process.env.STRIPE_SECRET_KEY; // Replace this

  try {
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { name, plan } = session.metadata || {};
    const email = session.customer_email;

    if (!email || !plan) return res.status(400).send('Missing email or plan');

    try {
      const existing = await Subscriber.findOne({ email, plan });
      if (!existing) {
        await Subscriber.create({
          name: name || '',
          email,
          plan,
          paymentStatus: 'paid',
          paymentAmount: session.amount_total ? session.amount_total / 100 : 0,
          paymentDetails: { stripe_session_id: session.id },
        });
      }
    } catch (err) {
      return res.status(500).send('DB error');
    }
  }

  res.json({ received: true });
};
