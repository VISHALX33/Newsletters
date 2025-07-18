import Subscriber from '../models/Subscriber.js';

export const subscribeUser = async (req, res) => {
  try {
    const { name, email, plan, paymentStatus, paymentAmount, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    if (!name || !email || !plan) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    let status = 'free';
    let amount = 0;
    let paymentDetails = {};

    if (plan === 'monthly' || plan === 'annually') {
      status = paymentStatus === 'paid' ? 'paid' : 'pending';
      amount = paymentAmount || (plan === 'monthly' ? 299 : 999);
      paymentDetails = {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      };
    }

    const subscriber = new Subscriber({
      name,
      email,
      plan,
      paymentStatus: status,
      paymentAmount: amount,
      paymentDetails,
    });
    await subscriber.save();
    res.status(201).json({ message: 'Subscription successful!', subscriber });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already subscribed.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 