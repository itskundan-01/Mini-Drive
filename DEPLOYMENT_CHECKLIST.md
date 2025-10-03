# Quick Deployment Checklist - Vercel Only

## Before Deployment

- [ ] Create MongoDB Atlas account and database
- [ ] Create Cloudinary account
- [ ] Push code to GitHub repository
- [ ] Create Vercel account

## Backend Deployment (Vercel)

- [ ] Go to Vercel Dashboard
- [ ] Create new Project
- [ ] Connect GitHub repository
- [ ] Set root directory to `backend`
- [ ] Add all environment variables:
  - [ ] NODE_ENV=production
  - [ ] MONGO_URI
  - [ ] JWT_SECRET
  - [ ] CLOUDINARY_CLOUD_NAME
  - [ ] CLOUDINARY_API_KEY
  - [ ] CLOUDINARY_API_SECRET
  - [ ] CORS_ORIGIN (leave empty, update later)
- [ ] Deploy and wait for completion
- [ ] Copy backend URL (e.g., https://mini-drive-backend.vercel.app)

## Frontend Deployment (Vercel)

- [ ] Go to Vercel Dashboard again
- [ ] Create new Project
- [ ] Connect same GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Add environment variable:
  - [ ] VITE_API_URL (your Vercel backend URL)
- [ ] Deploy and wait for completion
- [ ] Copy frontend URL (e.g., https://mini-drive.vercel.app)

## Final Configuration

- [ ] Go back to backend project in Vercel
- [ ] Update CORS_ORIGIN environment variable with frontend URL
- [ ] Redeploy backend (Deployments → ... → Redeploy)
- [ ] Test the application:
  - [ ] Sign up
  - [ ] Login
  - [ ] Upload file
  - [ ] View file
  - [ ] Download file
  - [ ] Delete file

## MongoDB Atlas Network Access

- [ ] In MongoDB Atlas, go to Network Access
- [ ] Add IP Address: 0.0.0.0/0 (Allow from anywhere)
- [ ] Save

---

## Environment Variables Quick Reference

### Backend (Vercel Project 1)
```
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_random_string
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CORS_ORIGIN=https://your-frontend.vercel.app
```

### Frontend (Vercel Project 2)
```
VITE_API_URL=https://your-backend.vercel.app
```

---

## Advantages of Vercel for Both

✅ **One Platform**: Manage both frontend and backend in one place
✅ **No Cold Starts**: Backend stays warm, no 30-60s delays
✅ **Faster Deployment**: 5 minutes total vs 15+ minutes
✅ **Auto-Scaling**: Handles traffic spikes automatically
✅ **Global CDN**: Better performance worldwide

---

**See DEPLOYMENT.md for detailed instructions**
