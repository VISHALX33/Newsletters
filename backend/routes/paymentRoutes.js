import express from 'express';
import { createOrder, createStripeSession, stripeWebhook } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/create-stripe-session', createStripeSession);
// Stripe webhook endpoint (no express.json middleware)
router.post('/stripe-webhook', stripeWebhook);

export default router; 