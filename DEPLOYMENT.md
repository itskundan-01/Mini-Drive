# Deployment Guide

This guide will walk you through deploying your Mini Drive application with the backend on Render and the frontend on Vercel.

## Prerequisites

- GitHub account
- Render account (https://render.com)
- Vercel account (https://vercel.com)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
- Cloudinary account (https://cloudinary.com)

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (or use existing one)
3. Click "Connect" → "Connect your application"
4. Copy the connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/mini-drive`)
5. Replace `<password>` with your actual password
6. Keep this connection string handy

### Step 2: Get Cloudinary Credentials

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Copy these values from your dashboard:
   - Cloud Name
   - API Key
   - API Secret

### Step 3: Deploy to Render

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Go to Render Dashboard**:
   - Visit https://dashboard.render.com
   - Click "New +" → "Web Service"

3. **Connect GitHub Repository**:
   - Select your Mini Drive repository
   - Click "Connect"

4. **Configure the Service**:
   - **Name**: `mini-drive-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or your preferred plan)

5. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable" and add these:

   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `5001` |
   | `MONGO_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | A long random string (e.g., use https://www.grc.com/passwords.htm) |
   | `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
   | `CLOUDINARY_API_KEY` | Your Cloudinary API key |
   | `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
   | `CORS_ORIGIN` | Leave empty for now (we'll update after deploying frontend) |

6. **Create Web Service**:
   - Click "Create Web Service"
   - Wait for deployment to complete (5-10 minutes)
   - Once deployed, copy your backend URL (e.g., `https://mini-drive-backend.onrender.com`)

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Production Environment File

1. In your local project, create `/frontend/.env.production`:
   ```bash
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   Replace with your actual Render backend URL from Part 1, Step 6

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import GitHub Repository**:
   - Select your Mini Drive repository
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `dist` (should be auto-detected)

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add:
     - **Key**: `VITE_API_URL`
     - **Value**: Your Render backend URL (e.g., `https://mini-drive-backend.onrender.com`)
     - **Environment**: All (Production, Preview, Development)

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (2-5 minutes)
   - Once deployed, copy your frontend URL (e.g., `https://mini-drive.vercel.app`)

---

## Part 3: Update Backend CORS Settings

1. **Go back to Render Dashboard**:
   - Navigate to your backend service
   - Click "Environment"
   - Find the `CORS_ORIGIN` variable

2. **Update CORS_ORIGIN**:
   - Change value to your Vercel frontend URL (e.g., `https://mini-drive.vercel.app`)
   - Click "Save Changes"
   - Service will automatically redeploy

---

## Part 4: Test Your Deployment

1. **Visit your Vercel frontend URL**
2. **Test the following**:
   - ✅ Sign up for a new account
   - ✅ Log in with credentials
   - ✅ Upload a file
   - ✅ View/download files
   - ✅ Delete a file
   - ✅ Admin features (if applicable)

---

## Environment Variables Summary

### Backend (Render)

```env
NODE_ENV=production
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mini-drive
JWT_SECRET=your_super_secret_random_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGIN=https://your-frontend.vercel.app
```

### Frontend (Vercel)

```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## Troubleshooting

### Backend Issues

**Problem**: "Application failed to respond"
- Check Render logs: Dashboard → Your Service → Logs
- Verify all environment variables are set correctly
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

**Problem**: CORS errors in browser console
- Verify `CORS_ORIGIN` in Render matches your Vercel URL exactly
- Check that URL doesn't have trailing slash

### Frontend Issues

**Problem**: "Network Error" or "Failed to fetch"
- Verify `VITE_API_URL` is set correctly in Vercel
- Check that backend is running (visit backend URL in browser)
- Open browser console to see detailed error messages

**Problem**: Environment variables not working
- Make sure variable name starts with `VITE_` prefix
- Redeploy frontend after adding/changing environment variables

### Database Issues

**Problem**: "MongoServerError: bad auth"
- Check MongoDB password in connection string
- Ensure user has correct permissions in MongoDB Atlas

**Problem**: "Connection timeout"
- In MongoDB Atlas: Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

---

## Updating Your Deployment

### Update Backend

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```

2. Render will automatically redeploy (auto-deploy is enabled by default)

### Update Frontend

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update frontend"
   git push origin main
   ```

2. Vercel will automatically redeploy

---

## Custom Domain (Optional)

### For Vercel (Frontend)

1. Go to your project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### For Render (Backend)

1. Go to your service → Settings → Custom Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `CORS_ORIGIN` to match new domain
5. Update `VITE_API_URL` in Vercel to match new backend domain

---

## Cost Considerations

### Free Tier Limits

**Render Free Plan**:
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month of running time

**Vercel Free Plan**:
- 100 GB bandwidth/month
- Unlimited deployments
- No sleep/spin-down

**MongoDB Atlas Free Plan**:
- 512 MB storage
- Shared cluster
- No credit card required

**Cloudinary Free Plan**:
- 25 GB storage
- 25 GB bandwidth/month
- Limited transformations

---

## Security Best Practices

1. ✅ Never commit `.env` files to GitHub
2. ✅ Use strong, random JWT_SECRET
3. ✅ Keep MongoDB credentials secure
4. ✅ Enable MongoDB IP whitelist when possible
5. ✅ Set proper CORS_ORIGIN (don't use '*')
6. ✅ Regularly rotate API keys and secrets
7. ✅ Monitor Cloudinary usage to prevent abuse

---

## Monitoring

### Render

- View logs: Dashboard → Service → Logs
- Check metrics: Dashboard → Service → Metrics

### Vercel

- View logs: Project → Deployments → Click deployment → View Logs
- Check analytics: Project → Analytics

---

## Support

If you encounter issues:

1. Check service logs first
2. Verify all environment variables
3. Test backend health endpoint: `https://your-backend.onrender.com/api/health`
4. Check browser console for frontend errors

---

## Next Steps

After successful deployment:

1. 🎉 Share your app URL with users
2. 📊 Monitor usage and performance
3. 🔒 Consider upgrading plans for production use
4. 🌐 Set up custom domain
5. 📧 Configure email notifications (future enhancement)
6. 🔄 Set up automated backups for MongoDB

---

**Congratulations! Your Mini Drive application is now live! 🚀**
