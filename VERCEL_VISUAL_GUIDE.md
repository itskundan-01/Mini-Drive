# 🎯 Vercel Deployment - Visual Guide

## Overview

```
┌─────────────────────────────────────────────────┐
│           Your GitHub Repository                │
│                                                 │
│  ┌─────────────┐         ┌─────────────┐      │
│  │  /backend   │         │  /frontend  │      │
│  │  (Node.js)  │         │   (React)   │      │
│  └─────────────┘         └─────────────┘      │
└─────────────────────────────────────────────────┘
                    │
                    │ Deploy to Vercel
                    ▼
┌─────────────────────────────────────────────────┐
│                 Vercel Platform                 │
│                                                 │
│  ┌──────────────────┐   ┌──────────────────┐  │
│  │   Project 1      │   │   Project 2      │  │
│  │   Backend API    │   │   Frontend UI    │  │
│  │   Serverless     │   │   Static Site    │  │
│  └──────────────────┘   └──────────────────┘  │
│          │                       │             │
│          │                       │             │
│   backend.vercel.app      app.vercel.app      │
└─────────────────────────────────────────────────┘
            │                       │
            └───────────┬───────────┘
                        │
            ┌───────────▼────────────┐
            │    Users Access        │
            │  Your Application      │
            └────────────────────────┘
```

---

## Deployment Flow

### Step 1: Prepare
```
Local Machine
    │
    ├── backend/.env (your secrets)
    ├── frontend/.env (API URL)
    │
    └── git push origin main
```

### Step 2: Deploy Backend
```
Vercel Dashboard
    │
    ├── New Project
    ├── Select Repo
    ├── Root Directory: backend ⚠️
    ├── Add Environment Variables
    │   ├── MONGO_URI
    │   ├── JWT_SECRET
    │   ├── CLOUDINARY_*
    │   └── CORS_ORIGIN (empty)
    │
    └── Deploy ✅
        │
        └── Get URL: https://mini-drive-backend.vercel.app
```

### Step 3: Deploy Frontend
```
Vercel Dashboard (again)
    │
    ├── New Project
    ├── Select Same Repo
    ├── Root Directory: frontend ⚠️
    ├── Add Environment Variable
    │   └── VITE_API_URL=https://mini-drive-backend.vercel.app
    │
    └── Deploy ✅
        │
        └── Get URL: https://mini-drive.vercel.app
```

### Step 4: Connect Them
```
Backend Project Settings
    │
    ├── Environment Variables
    ├── Edit CORS_ORIGIN
    ├── Value: https://mini-drive.vercel.app
    │
    └── Redeploy ✅
```

---

## Architecture After Deployment

```
┌──────────────────────────────────────────────────────────┐
│                        Internet                          │
└──────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴──────────┐
                │                      │
        ┌───────▼────────┐    ┌───────▼────────┐
        │   Frontend      │    │   Backend      │
        │   Vercel CDN    │    │   Serverless   │
        │   Static Files  │    │   Functions    │
        └───────┬─────────┘    └───────┬────────┘
                │                      │
                │   API Calls          │
                └──────────────────────┤
                                       │
                    ┌──────────────────┴────────────────┐
                    │                                   │
            ┌───────▼────────┐              ┌──────────▼──────────┐
            │  MongoDB Atlas  │              │    Cloudinary       │
            │  (Database)     │              │  (File Storage)     │
            └─────────────────┘              └─────────────────────┘
```

---

## Environment Variables Flow

### Development (Local)
```
backend/.env          →  Express Server  →  localhost:5001
frontend/.env         →  Vite Dev Server →  localhost:5173
```

### Production (Vercel)
```
Vercel Backend Env    →  Serverless API  →  *.vercel.app
Vercel Frontend Env   →  Static Build    →  *.vercel.app
```

---

## Request Flow Example

### User Uploads a File

```
1. User clicks Upload
   │
   ├── Frontend (mini-drive.vercel.app)
   │   └── POST /api/files
   │
2. Request goes to Backend
   │
   ├── Backend (mini-drive-backend.vercel.app/api/files)
   │   ├── Authenticate JWT
   │   ├── Process with Multer
   │   │
   │   ├──> Upload to Cloudinary
   │   │    └── Get file URL
   │   │
   │   └──> Save metadata to MongoDB
   │        └── Return response
   │
3. Response back to Frontend
   │
   └── UI updates with new file
```

---

## Project Structure on Vercel

### Backend Project
```
Root: /backend
Files:
  ├── server.js         (Entry point)
  ├── vercel.json       (Config)
  ├── package.json      (Dependencies)
  ├── /config           (DB, Cloudinary)
  ├── /routes           (API routes)
  ├── /controllers      (Business logic)
  ├── /models           (MongoDB models)
  └── /middleware       (Auth, etc.)
```

### Frontend Project
```
Root: /frontend
Files:
  ├── index.html        (Entry HTML)
  ├── vercel.json       (Config)
  ├── package.json      (Dependencies)
  ├── /src
  │   ├── main.jsx      (React entry)
  │   ├── /pages        (Route pages)
  │   ├── /components   (UI components)
  │   └── /api          (API client)
  └── /dist             (Build output)
```

---

## Monitoring Your Deployment

### Check Backend Status
```
Browser: https://mini-drive-backend.vercel.app
Expected: "API is running..."

Health Check: https://mini-drive-backend.vercel.app/api/health
Expected: {"status":"ok","message":"Server is healthy"}
```

### Check Frontend
```
Browser: https://mini-drive.vercel.app
Expected: Login/Signup page
```

### View Logs
```
Vercel Dashboard
  └── Your Project
      └── Deployments
          └── Click deployment
              └── View Function Logs (backend)
              └── View Build Logs (frontend)
```

---

## Quick Commands Reference

### Before Deploying
```bash
# Check current status
git status

# Commit changes
git add .
git commit -m "Configure for Vercel deployment"

# Push to GitHub
git push origin main
```

### After Deploying
```bash
# Test backend
curl https://your-backend.vercel.app/api/health

# Test frontend (in browser)
https://your-frontend.vercel.app
```

### Update and Redeploy
```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Vercel auto-deploys both projects! 🚀
```

---

## Success Indicators

✅ **Backend Deployed Successfully**
- Visit backend URL → See "API is running..."
- No errors in Function Logs
- All routes accessible

✅ **Frontend Deployed Successfully**  
- Visit frontend URL → See login page
- No 404 errors
- Assets load correctly

✅ **They're Connected**
- Can login/signup
- Can upload files
- Can view/download files
- No CORS errors in browser console

---

## Troubleshooting Checklist

❌ **Backend shows "Internal Server Error"**
- [ ] Check Function Logs in Vercel
- [ ] Verify all environment variables are set
- [ ] Check MongoDB Atlas network access (0.0.0.0/0)
- [ ] Verify MongoDB connection string password

❌ **Frontend shows "Network Error"**
- [ ] Check VITE_API_URL is set correctly
- [ ] Visit backend URL directly (should work)
- [ ] Check browser console for CORS errors

❌ **CORS Error**
- [ ] Verify CORS_ORIGIN matches frontend URL exactly
- [ ] No trailing slash in URLs
- [ ] Redeploy backend after changing CORS_ORIGIN

---

## URLs to Bookmark

After deployment, save these:

```
Frontend:  https://your-app.vercel.app
Backend:   https://your-app-backend.vercel.app
Health:    https://your-app-backend.vercel.app/api/health

Vercel Dashboard:      https://vercel.com/dashboard
MongoDB Atlas:         https://cloud.mongodb.com
Cloudinary Dashboard:  https://cloudinary.com/console
```

---

**Ready to deploy? Follow DEPLOYMENT.md for step-by-step instructions! 🚀**
