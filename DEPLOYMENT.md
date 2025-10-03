# Deployment Guide - Vercel (Frontend + Backend)

This guide will walk you through deploying your Mini Drive application with **both frontend and backend on Vercel**. This is the simplest deployment option!

## Prerequisites

- GitHub account
- Vercel account (https://vercel.com) - **That's it!**
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
- Cloudinary account (https://cloudinary.com)

---

## Part 1: Prepare MongoDB and Cloudinary

### Step 1: Setup MongoDB Database

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

### Step 3: Configure MongoDB Network Access

1. In MongoDB Atlas, go to **Network Access**
2. Click "Add IP Address"
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click "Confirm"

---

## Part 2: Deploy Backend to Vercel

### Step 1: Push Code to GitHub (if not done)

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy Backend on Vercel

1. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import GitHub Repository**:
   - Select your Mini Drive repository
   - Click "Import"

3. **Configure Backend Project**:
   - **Project Name**: `mini-drive-backend` (or your preferred name)
   - **Framework Preset**: Other
   - **Root Directory**: Click "Edit" → Select `backend`
   - **Build Command**: Leave empty (not needed)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   Click "Environment Variables" and add these:

   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `MONGO_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | A long random string (generate at https://www.grc.com/passwords.htm) |
   | `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
   | `CLOUDINARY_API_KEY` | Your Cloudinary API key |
   | `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
   | `CORS_ORIGIN` | Leave empty for now (we'll update after frontend deployment) |

   **Environment**: Select "Production", "Preview", and "Development" for all variables

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (3-5 minutes)
   - Once deployed, copy your backend URL (e.g., `https://mini-drive-backend.vercel.app`)

---

## Part 3: Deploy Frontend to Vercel

### Step 1: Deploy Frontend on Vercel

1. **Go back to Vercel Dashboard**:
   - Click "Add New..." → "Project"

2. **Import Same GitHub Repository Again**:
   - Select your Mini Drive repository
   - Click "Import"

3. **Configure Frontend Project**:
   - **Project Name**: `mini-drive` (or your preferred name)
   - **Framework Preset**: Vite (should be auto-detected)
   - **Root Directory**: Click "Edit" → Select `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

4. **Add Environment Variable**:
   Click "Environment Variables" and add:

   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | Your backend Vercel URL (e.g., `https://mini-drive-backend.vercel.app`) |

   **Environment**: Select "Production", "Preview", and "Development"

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - Once deployed, copy your frontend URL (e.g., `https://mini-drive.vercel.app`)

---

## Part 4: Update Backend CORS Settings

1. **Go to Vercel Dashboard**
2. **Navigate to your backend project** (`mini-drive-backend`)
3. **Go to Settings → Environment Variables**
4. **Find `CORS_ORIGIN` variable**
5. **Edit and set value to your frontend URL** (e.g., `https://mini-drive.vercel.app`)
6. **Save**
7. **Redeploy**: Go to Deployments → Click "..." on latest deployment → "Redeploy"

---

## Part 5: Test Your Deployment

1. **Visit your frontend URL** (e.g., `https://mini-drive.vercel.app`)
2. **Test the following**:
   - ✅ Sign up for a new account
   - ✅ Log in with credentials
   - ✅ Upload a file (image, PDF, document)
   - ✅ View files (images and PDFs should open in browser)
   - ✅ Download files
   - ✅ Delete a file
   - ✅ Admin features (if you have admin account)

---

---

## Environment Variables Summary

### Backend (Vercel)

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mini-drive
JWT_SECRET=your_super_secret_random_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGIN=https://your-frontend.vercel.app
```

### Frontend (Vercel)

```env
VITE_API_URL=https://your-backend.vercel.app
```

---

## Advantages of Vercel for Both

✅ **Simpler**: Only one platform to manage
✅ **Faster**: Both deploy in under 5 minutes total
✅ **No Cold Starts**: Unlike Render free tier, Vercel doesn't sleep
✅ **Better Performance**: Global CDN for both frontend and backend
✅ **Automatic HTTPS**: SSL certificates for both projects
✅ **Preview Deployments**: Every git push gets a preview URL

---

## Troubleshooting

### Backend Issues

**Problem**: "Application error" or "Internal Server Error"
- Check Vercel deployment logs: Project → Deployments → Click deployment → View Function Logs
- Verify all environment variables are set correctly
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

**Problem**: CORS errors in browser console
- Verify `CORS_ORIGIN` in Vercel backend matches your frontend URL exactly
- Check that URL doesn't have trailing slash
- Redeploy backend after updating CORS_ORIGIN

### Frontend Issues

**Problem**: "Network Error" or "Failed to fetch"
- Verify `VITE_API_URL` is set correctly in Vercel
- Check that backend is running (visit backend URL in browser, should show "API is running...")
- Open browser console to see detailed error messages

**Problem**: Environment variables not working
- Make sure variable name starts with `VITE_` prefix for frontend
- Redeploy after adding/changing environment variables
- Check that environment is set to "Production"

### Database Issues

**Problem**: "MongoServerError: bad auth"
- Check MongoDB password in connection string
- Ensure user has correct permissions in MongoDB Atlas

**Problem**: "Connection timeout"
- In MongoDB Atlas: Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

### File Upload Issues

**Problem**: Files fail to upload
- Check Cloudinary credentials are correct
- Verify file size is under 5MB limit
- Check browser console for detailed errors

---

## Updating Your Deployment

### Update Backend or Frontend

1. Make your changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```

3. Vercel will **automatically redeploy both projects**
4. Check deployment status in Vercel dashboard

---

## Custom Domain (Optional)

### For Frontend

1. Go to your frontend project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### For Backend

1. Go to your backend project → Settings → Domains
2. Add your custom domain (e.g., api.yourdomain.com)
3. Follow DNS configuration instructions
4. Update `VITE_API_URL` in frontend project to new backend domain
5. Update `CORS_ORIGIN` in backend project to new frontend domain

---

## Cost Considerations

### Vercel Free Tier (Hobby Plan)

**Per Project (you'll have 2 projects)**:
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- No cold starts
- Serverless functions: 100 GB-hours/month

**Total for both projects**: Still FREE! 🎉

**MongoDB Atlas Free Plan**:
- 512 MB storage
- Shared cluster
- No credit card required

**Cloudinary Free Plan**:
- 25 GB storage
- 25 GB bandwidth/month

---

## Security Best Practices

1. ✅ Never commit `.env` files to GitHub
2. ✅ Use strong, random JWT_SECRET (at least 32 characters)
3. ✅ Keep MongoDB credentials secure
4. ✅ Enable MongoDB IP whitelist (0.0.0.0/0 for Vercel)
5. ✅ Set proper CORS_ORIGIN (don't use '*')
6. ✅ Regularly rotate API keys and secrets
7. ✅ Monitor Cloudinary usage to prevent abuse
8. ✅ Enable Vercel's built-in protection features

---

## Monitoring

### Vercel

**Backend**:
- View logs: Project → Deployments → Click deployment → Function Logs
- Check metrics: Project → Analytics

**Frontend**:
- View logs: Project → Deployments → Click deployment → View Logs
- Check analytics: Project → Analytics

### MongoDB Atlas

- Monitor usage: Database → Metrics
- Check slow queries: Database → Performance Advisor

---

## Support

If you encounter issues:

1. ✅ Check Vercel deployment logs first
2. ✅ Verify all environment variables
3. ✅ Test backend health: Visit `https://your-backend.vercel.app/api/health`
4. ✅ Check browser console for frontend errors
5. ✅ Review MongoDB Atlas connection
6. ✅ Verify Cloudinary credentials

---

## Next Steps

After successful deployment:

1. 🎉 Share your app URL with users
2. 📊 Monitor usage and performance via Vercel Analytics
3. 🌐 Consider setting up custom domain
4. 📧 Add email notifications (future enhancement)
5. 🔄 Set up automated MongoDB backups
6. 🔐 Consider upgrading to Vercel Pro for enhanced features

---

## Why Vercel for Both?

Compared to Render + Vercel:

| Feature | Vercel (Both) | Render + Vercel |
|---------|---------------|-----------------|
| Setup Complexity | ⭐⭐ Simple | ⭐⭐⭐ Medium |
| Deployment Time | ~5 min total | ~15 min total |
| Cold Starts | ❌ None | ✅ Yes (backend) |
| Management | 1 platform | 2 platforms |
| Free Tier Limits | Generous | Limited (Render) |
| Performance | Excellent | Good |
| Auto-scaling | ✅ Yes | ✅ Yes |

---

**Congratulations! Your Mini Drive application is now live on Vercel! 🚀**
