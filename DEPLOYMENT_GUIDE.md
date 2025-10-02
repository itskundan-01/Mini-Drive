# 🚀 Deployment Guide for Mini Drive

This guide will help you deploy Mini Drive to production.

## Prerequisites

Before deploying, make sure you have:
- ✅ MongoDB Atlas account (free tier works)
- ✅ Cloudinary account (free tier works)
- ✅ Hosting platform accounts (see options below)

## Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) - Recommended

#### Deploy Backend to Render

1. **Create a Render account** at https://render.com

2. **Push your code to GitHub** (if not already)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

3. **Create a new Web Service on Render**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: mini-drive-backend
     - **Root Directory**: backend
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

4. **Add Environment Variables** in Render dashboard:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

5. **Deploy!** Render will give you a URL like: `https://mini-drive-backend.onrender.com`

#### Deploy Frontend to Vercel

1. **Update API URL** in `frontend/src/api/axios.js`:
   ```javascript
   const API_URL = 'https://mini-drive-backend.onrender.com/api';
   ```

2. **Create a Vercel account** at https://vercel.com

3. **Deploy to Vercel**
   ```bash
   cd frontend
   npm run build
   npx vercel
   ```
   
   Or connect your GitHub repo through Vercel dashboard:
   - Click "New Project"
   - Import your repository
   - Set **Root Directory**: frontend
   - Click "Deploy"

4. Your frontend will be live at: `https://your-app.vercel.app`

---

### Option 2: Heroku (Full Stack)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create a Heroku app**
   ```bash
   heroku create mini-drive-app
   ```

3. **Add Node.js buildpack**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

4. **Set environment variables**
   ```bash
   heroku config:set MONGO_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set CLOUDINARY_CLOUD_NAME=your_name
   heroku config:set CLOUDINARY_API_KEY=your_key
   heroku config:set CLOUDINARY_API_SECRET=your_secret
   ```

5. **Deploy backend**
   ```bash
   git subtree push --prefix backend heroku main
   ```

6. **Deploy frontend separately** or serve it from Express (requires setup)

---

### Option 3: Railway (Full Stack)

1. **Create Railway account** at https://railway.app

2. **Deploy via GitHub**
   - Connect your GitHub repository
   - Railway will auto-detect Node.js
   - Set root directory to `backend`

3. **Add Environment Variables** in Railway dashboard

4. **Deploy frontend** to Vercel or Netlify (same as Option 1)

---

### Option 4: DigitalOcean App Platform

1. **Create DigitalOcean account**

2. **Create a new app** from GitHub

3. **Configure components:**
   - Backend: Node.js service
   - Frontend: Static site

4. **Set environment variables**

5. **Deploy!**

---

## Post-Deployment Checklist

### Backend Verification
- [ ] Backend URL is accessible
- [ ] MongoDB connection works
- [ ] API endpoints respond correctly
- [ ] CORS is configured for frontend URL
- [ ] Cloudinary uploads work

### Frontend Verification
- [ ] Frontend loads correctly
- [ ] API URL points to deployed backend
- [ ] Login/Signup works
- [ ] File upload works
- [ ] File download works
- [ ] File deletion works
- [ ] Admin features work

### Security Checklist
- [ ] JWT_SECRET is strong and unique
- [ ] .env file is in .gitignore
- [ ] MongoDB database has authentication
- [ ] CORS only allows your frontend domain
- [ ] HTTPS is enabled
- [ ] Sensitive data is not logged

---

## Environment-Specific Configuration

### Production Backend CORS Update

Update `backend/server.js`:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
```

Add to your environment variables:
```
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Production API URL

Update `frontend/src/api/axios.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-domain.onrender.com/api
```

---

## MongoDB Atlas Setup for Production

1. **Create a cluster** at https://cloud.mongodb.com

2. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Allow access from anywhere: `0.0.0.0/0` (for cloud hosting)

3. **Create a database user**
   - Go to "Database Access"
   - Add a new database user with password
   - Note the username and password

4. **Get connection string**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Add `/mini-drive` at the end

---

## Performance Optimization

### Backend
- Enable compression in Express
- Add rate limiting for API endpoints
- Implement caching where appropriate
- Use production MongoDB indexes

### Frontend
- Lazy load routes with React.lazy()
- Optimize images before upload
- Enable Vite build optimizations
- Use CDN for static assets

---

## Monitoring & Maintenance

### Recommended Tools
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **MongoDB Atlas**: Database monitoring
- **Cloudinary**: Usage statistics

### Regular Maintenance
- Monitor API response times
- Check Cloudinary storage usage
- Review database performance
- Update dependencies regularly
- Monitor error logs

---

## Custom Domain Setup

### For Frontend (Vercel)
1. Buy a domain (Namecheap, GoDaddy, etc.)
2. Go to Vercel project settings
3. Add custom domain
4. Update DNS records as instructed

### For Backend (Render)
1. Go to Render dashboard
2. Add custom domain in settings
3. Update DNS records
4. SSL will be auto-configured

---

## Troubleshooting Deployment Issues

### "Cannot connect to database"
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check connection string has correct password
- Ensure database user has proper permissions

### "CORS error in production"
- Update CORS origin to match frontend URL
- Check if HTTPS is being used
- Verify credentials: true is set if needed

### "Build fails"
- Check all dependencies are in package.json
- Verify Node version compatibility
- Check build logs for specific errors

### "Frontend can't reach backend"
- Verify API_URL is correct in frontend
- Check if backend is actually running
- Test API endpoints with Postman

---

## Cost Estimation (Free Tier)

- **MongoDB Atlas**: Free (512MB storage)
- **Cloudinary**: Free (25GB storage, 25GB bandwidth)
- **Vercel**: Free (100GB bandwidth)
- **Render**: Free (750 hours/month, sleeps after 15min)

**Total Monthly Cost**: $0 (with free tiers)

For production with more traffic, expect:
- Vercel Pro: $20/month
- Render Starter: $7/month
- MongoDB Atlas: $9/month (M2 cluster)
- Cloudinary Plus: $99/month (if needed)

---

## Next Steps After Deployment

1. **Set up monitoring** (Sentry, LogRocket)
2. **Configure backups** (MongoDB Atlas automated backups)
3. **Set up CI/CD** (GitHub Actions)
4. **Add analytics** (Google Analytics, Mixpanel)
5. **Create admin user** via database
6. **Test all features** in production
7. **Share with users!** 🎉

---

## Support & Resources

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Cloudinary Docs: https://cloudinary.com/documentation
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs

---

**Good luck with your deployment!** 🚀

If you encounter issues, check the troubleshooting section or refer to the platform-specific documentation.
