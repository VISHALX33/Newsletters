# Newsletter
Subscription-Based Newsletter Web/App Signup  for Nodesure


Tech Stack :-
Frontend: React.js + Tailwind CSS
Backend: Node.js + Express
Database: MongoDB (Mongoose)
Payment: Razorpay & Stripe (test mode)

Features :-
Homepage showing newsletter benefits and features.
Signup form with name, email, and plan selection (Free, Monthly, Annually).
Payment integration with Razorpay and Stripe for paid plans.
Backend saves subscriber status and payment details.
MongoDB stores all user subscriptions.
Conditional rendering for free vs. paid plans.
Thank You page after successful signup/payment.

Screenshots:-
1.(HomePage)  https://res.cloudinary.com/dwq5qifuk/image/upload/v1752861102/Screenshot_2025-07-18_230451_suvl9r.png
2.(free and premium)https://res.cloudinary.com/dwq5qifuk/image/upload/v1752861100/Screenshot_2025-07-18_230801_iisots.png
3.(Razorpay)https://res.cloudinary.com/dwq5qifuk/image/upload/v1752861100/Screenshot_2025-07-18_231054_dzswzn.png
4.(Razorpay) https://res.cloudinary.com/dwq5qifuk/image/upload/v1752861100/Screenshot_2025-07-18_231120_qn6tg2.png
5.(Stripe)https://res.cloudinary.com/dwq5qifuk/image/upload/v1752861101/Screenshot_2025-07-18_231255_figebg.png
6.(Stripe)https://res.cloudinary.com/dwq5qifuk/image/upload/v1752861104/Screenshot_2025-07-18_231652_fppwse.png
7.(Thank You Page)https://res.cloudinary.com/dwq5qifuk/image/upload/v1752861100/Screenshot_2025-07-18_230907_liafii.png
8.(MongoDB Database)https://res.cloudinary.com/dwq5qifuk/image/upload/v1752861101/Screenshot_2025-07-18_231445_ck4flk.png  

MongoDB Schema:-(Model)
{
  name: String,
  email: String,
  plan: 'free' | 'monthly' | 'annually',
  paymentStatus: 'free' | 'paid' | 'pending',
  paymentAmount: Number,
  paymentDetails: Object,
  createdAt: Date,
  updatedAt: Date
}

Test Payments:
Use Razorpay/Stripe test cards (e.g., 4242 4242 4242 4242 for Stripe).
See payment in your Stripe/Razorpay dashboard (test mode).
