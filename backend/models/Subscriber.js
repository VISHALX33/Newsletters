import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  plan: {
    type: String,
    enum: ['free', 'monthly', 'annually'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'free'],
    default: 'free',
  },
  paymentAmount: {
    type: Number,
    default: 0,
  },
  paymentDetails: {
    type: Object,
    default: {},
  },
}, {
  timestamps: true,
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber; 