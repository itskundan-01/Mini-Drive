# Quick Deployment Checklist

## Before Deployment

- [ ] Create MongoDB Atlas account and database
- [ ] Create Cloudinary account
- [ ] Push code to GitHub repository
- [ ] Create Render account
- [ ] Create Vercel account

## Backend Deployment (Render)

- [ ] Create new Web Service on Render
- [ ] Connect GitHub repository
- [ ] Set root directory to `backend`
- [ ] Add all environment variables:
  - [ ] NODE_ENV
  - [ ] PORT
  - [ ] MONGO_URI
  - [ ] JWT_SECRET
  - [ ] CLOUDINARY_CLOUD_NAME
  - [ ] CLOUDINARY_API_KEY
  - [ ] CLOUDINARY_API_SECRET
  - [ ] CORS_ORIGIN (update after frontend deployment)
- [ ] Deploy and wait for completion
- [ ] Copy backend URL

## Frontend Deployment (Vercel)

- [ ] Create new Project on Vercel
- [ ] Connect GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Add environment variable:
  - [ ] VITE_API_URL (your Render backend URL)
- [ ] Deploy and wait for completion
- [ ] Copy frontend URL

## Final Configuration

- [ ] Update CORS_ORIGIN in Render with Vercel URL
- [ ] Wait for Render to redeploy
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

### Backend (Render)
```
NODE_ENV=production
PORT=5001
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_random_string
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CORS_ORIGIN=https://your-app.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com
```

---

**See DEPLOYMENT.md for detailed instructions**
