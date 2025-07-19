# Newsletters
Newsletters for NodeSure

## 🚀 Deployment Guide

This project is configured for deployment on **Render** (Backend) and **Netlify** (Frontend).

### 📋 Prerequisites

1. **MongoDB Atlas** account for database
2. **Razorpay** account for payments
3. **Stripe** account for payments (optional)
4. **Render** account for backend hosting
5. **Netlify** account for frontend hosting

### 🔧 Environment Variables

#### Backend (.env)
```env
MONGO_URI=your_mongodb_atlas_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=https://your-netlify-app.netlify.app
PORT=5000
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-render-app.onrender.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 🎯 Deployment Steps

#### 1. Backend Deployment (Render)

1. **Push your code to GitHub**
2. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder

3. **Configure the service:**
   - **Name**: `newsletter-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

4. **Add Environment Variables:**
   - Go to "Environment" tab
   - Add all variables from the backend .env example

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the generated URL (e.g., `https://your-app.onrender.com`)

#### 2. Frontend Deployment (Netlify)

1. **Update API URL:**
   - Replace `VITE_API_URL` with your Render backend URL

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build settings:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

3. **Add Environment Variables:**
   - Go to "Site settings" → "Environment variables"
   - Add `VITE_API_URL` and `VITE_RAZORPAY_KEY_ID`

4. **Configure Redirects:**
   - The `netlify.toml` file handles SPA routing

### 🔄 Update Backend CORS

After getting your Netlify URL, update the CORS configuration in `backend/server.js`:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://your-actual-netlify-app.netlify.app', // Replace with your URL
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200
};
```

### 🧪 Testing Deployment

1. **Test Free Subscription:**
   - Visit your Netlify URL
   - Try signing up with the free plan

2. **Test Payment Flow:**
   - Try the monthly/annual plans
   - Use Razorpay test credentials

3. **Check Database:**
   - Verify subscribers are saved in MongoDB Atlas

### 🛠️ Local Development

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### 📝 Notes

- Ensure all environment variables are properly set
- Test payment flows with test credentials first
- Monitor Render logs for any deployment issues
- Set up proper error monitoring for production
