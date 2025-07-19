import express from 'express';
import { createOrder, createStripeSession, stripeWebhookHandler } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/create-stripe-session', createStripeSession);
router.post(
  '/stripe-webhook',
  express.raw({ type: 'application/json' }), 
  stripeWebhookHandler);


export default router; 