import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PLANS = [
  {
    key: 'free',
    name: 'Free',
    price: 0,
    displayPrice: 'Free',
    originalPrice: null,
    benefits: [
      'Weekly newsletter',
      'Basic tech news',
      'Community access',
    ],
  },
  {
    key: 'monthly',
    name: 'Monthly',
    price: 299,
    displayPrice: '₹299',
    originalPrice: 499,
    benefits: [
      'All Free benefits',
      'Premium articles',
      'Early access to features',
      'Cancel anytime',
    ],
  },
  {
    key: 'annually',
    name: 'Annually',
    price: 999,
    displayPrice: '₹999',
    originalPrice: 1999,
    benefits: [
      'All Monthly benefits',
      'Best value (save 50%)',
      'Exclusive annual webinars',
    ],
  },
];

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) return resolve(true);
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const SignupForm = () => {
  const [form, setForm] = useState({ name: '', email: '', plan: 'free' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const selectedPlan = PLANS.find((p) => p.key === form.plan);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlanSelect = (plan) => {
    setForm({ ...form, plan });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (form.plan === 'free') {
      try {
        // const res = await fetch('http://localhost:5000/api/subscribe', {
        const res = await fetch('http://https://newsletters-fjzl.onrender.com/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage(data.message);
          setForm({ name: '', email: '', plan: 'free' });
          setTimeout(() => navigate('/thankyou'), 1000);
        } else {
          setError(data.message || 'Something went wrong.');
        }
      } catch (err) {
        setError('Server error.');
      }
      setLoading(false);
      return;
    }

    await handleRazorpay();
  };

  const handleRazorpay = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    const res = await loadRazorpayScript();
    if (!res) {
      setError('Failed to load Razorpay.');
      setLoading(false);
      return;
    }
    try {
      // const orderRes = await fetch('http://localhost:5000/api/payments/create-order', {
      const orderRes = await fetch('http://https://newsletters-fjzl.onrender.com/api/payments/create-order', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: selectedPlan.price }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.message || 'Order creation failed');
      const { order } = orderData;

      const options = {
        key: 'rzp_test_oWXgcMskRelZAf',
        amount: order.amount,
        currency: order.currency,
        name: `Newsletter ${selectedPlan.name}`,
        description: `${selectedPlan.name} Subscription`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // const subscribeRes = await fetch('http://localhost:5000/api/subscribe', {
            const subscribeRes = await fetch('http://https://newsletters-fjzl.onrender.com/api/subscribe', {

              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...form,
                plan: form.plan,
                paymentStatus: 'paid',
                paymentAmount: selectedPlan.price,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const subscribeData = await subscribeRes.json();
            if (subscribeRes.ok) {
              setMessage(subscribeData.message);
              setForm({ name: '', email: '', plan: 'free' });
              setTimeout(() => navigate('/thankyou'), 1000);
            } else {
              setError(subscribeData.message || 'Subscription failed.');
            }
          } catch (err) {
            setError('Subscription error.');
          }
          setLoading(false);
        },
        prefill: {
          name: form.name,
          email: form.email,
        },
        theme: { color: '#16a34a' }, // Changed to green
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message || 'Payment error.');
      setLoading(false);
    }
  };

  const handleStripe = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    try {
      // const res = await fetch('http://localhost:5000/api/payments/create-stripe-session', {
      const res = await fetch('http://https://newsletters-fjzl.onrender.com/api/payments/create-stripe-session', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: form.plan,
          name: form.name,
          email: form.email,
        }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.message || 'Stripe session error.');
        setLoading(false);
      }
    } catch (err) {
      setError('Stripe payment error.');
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 md:p-10 mt-8 bg-white rounded-lg shadow-lg border border-green-50"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Sign up for our Newsletter</h2>

      {message && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {PLANS.map((plan) => (
          <div
            key={plan.key}
            className={`rounded-lg border-2 p-6 flex flex-col items-center transition-all cursor-pointer relative
              ${form.plan === plan.key 
                ? 'border-green-500 shadow-lg bg-green-50' 
                : 'border-gray-200 hover:border-green-300 bg-white'}`}
            onClick={() => handlePlanSelect(plan.key)}
          >
            <div className="text-xl font-bold mb-2 text-green-700">{plan.name}</div>
            {plan.originalPrice && (
              <div className="text-gray-400 line-through text-sm">₹{plan.originalPrice}</div>
            )}
            <div className={`text-3xl font-extrabold mb-4 ${
              plan.originalPrice ? 'text-green-600' : 'text-gray-700'
            }`}>
              {plan.displayPrice}
            </div>
            <ul className="mb-4 text-sm text-gray-700 text-left list-disc list-inside space-y-2">
              {plan.benefits.map((b, i) => (
                <li key={i} className="leading-tight">{b}</li>
              ))}
            </ul>
            {form.plan === plan.key && (
              <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                Selected
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
          required
        />
      </div>

      {form.plan !== 'free' && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 text-green-700 text-sm">
          {selectedPlan.displayPrice} will be charged after clicking a payment option below.
        </div>
      )}

      {form.plan === 'free' ? (
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-green-400"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Sign Up Now'}
        </button>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="button"
            onClick={handleRazorpay}
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-green-400"
          >
            {loading ? 'Processing...' : 'Pay with Razorpay'}
          </button>
          <button
            type="button"
            onClick={handleStripe}
            disabled={loading}
            className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:bg-gray-500"
          >
            {loading ? 'Processing...' : 'Pay with Stripe'}
          </button>
        </div>
      )}
    </form>
  );
};

export default SignupForm;