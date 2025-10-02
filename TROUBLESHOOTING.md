# 🔧 Troubleshooting Guide for Mini Drive

This guide covers common issues you might encounter and how to solve them.

## Table of Contents
1. [Backend Issues](#backend-issues)
2. [Frontend Issues](#frontend-issues)
3. [Database Issues](#database-issues)
4. [File Upload Issues](#file-upload-issues)
5. [Authentication Issues](#authentication-issues)
6. [Deployment Issues](#deployment-issues)
7. [General Tips](#general-tips)

---

## Backend Issues

### ❌ "Cannot find module 'express'"

**Problem**: Missing dependencies

**Solution**:
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Port 5001 is already in use"

**Problem**: Another process is using port 5001

**Solution 1**: Change the port in `.env`
```env
PORT=5002
```

**Solution 2**: Find and kill the process
```bash
# macOS/Linux
lsof -ti:5001 | xargs kill -9

# Windows
netstat -ano | findstr :5001
taskkill /PID [PID_NUMBER] /F
```

### ❌ "MongoDB connection failed"

**Problem**: Cannot connect to MongoDB

**Solutions**:
1. Check if MongoDB is running (local):
   ```bash
   # macOS
   brew services list
   brew services start mongodb-community
   
   # Linux
   sudo systemctl status mongod
   sudo systemctl start mongod
   ```

2. Verify MONGO_URI in `.env`:
   - Local: `mongodb://localhost:27017/mini-drive`
   - Atlas: Must include password and database name

3. For MongoDB Atlas:
   - Whitelist your IP (0.0.0.0/0 for all IPs)
   - Check username and password
   - Ensure connection string ends with `/mini-drive`

### ❌ "JWT_SECRET is not defined"

**Problem**: Missing environment variable

**Solution**:
1. Check `.env` file exists in backend folder
2. Verify it contains:
   ```env
   JWT_SECRET=your_secret_key_here
   ```
3. Restart the backend server

### ❌ "Cloudinary configuration not found"

**Problem**: Missing Cloudinary credentials

**Solution**:
1. Sign up at https://cloudinary.com
2. Get credentials from dashboard
3. Add to `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Restart server

---

## Frontend Issues

### ❌ "npm ERR! code ERESOLVE"

**Problem**: Dependency conflicts

**Solution**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### ❌ Blank white screen

**Problem**: React errors or missing modules

**Solutions**:
1. Open browser console (F12) and check for errors
2. Verify all dependencies are installed:
   ```bash
   cd frontend
   npm install
   ```
3. Check if backend is running
4. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### ❌ "Failed to fetch" or "Network Error"

**Problem**: Cannot connect to backend

**Solutions**:
1. Verify backend is running on port 5001
2. Check API URL in `frontend/src/api/axios.js`:
   ```javascript
   const API_URL = 'http://localhost:5001/api';
   ```
3. Check CORS is enabled in backend
4. Disable browser extensions (ad blockers)

### ❌ Tailwind styles not working

**Problem**: Tailwind not configured properly

**Solutions**:
1. Verify `tailwind.config.js` exists
2. Check `index.css` has Tailwind imports:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. Restart dev server

### ❌ "React Router not working"

**Problem**: Routes not rendering

**Solutions**:
1. Check `App.jsx` has `BrowserRouter` wrapper
2. Verify `react-router-dom` is installed:
   ```bash
   npm install react-router-dom
   ```
3. Check route paths match exactly

---

## Database Issues

### ❌ "User already exists"

**Problem**: Trying to create duplicate email

**Solution**: This is expected behavior. Use a different email or login with existing account.

### ❌ Cannot connect to MongoDB Atlas

**Problem**: Network access or credentials

**Solutions**:
1. **Whitelist IP Address**:
   - Go to MongoDB Atlas dashboard
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow all) for development

2. **Check Credentials**:
   - Database Access → Verify user exists
   - Ensure password is correct (no special characters issues)

3. **Connection String**:
   - Should look like: `mongodb+srv://username:password@cluster.mongodb.net/mini-drive`
   - Password must be URL-encoded if it has special characters

### ❌ "MongooseServerSelectionError"

**Problem**: Cannot find MongoDB server

**Solutions**:
1. Verify MongoDB is running (local)
2. Check internet connection (Atlas)
3. Verify connection string format
4. Try using MongoDB Compass to test connection

---

## File Upload Issues

### ❌ "File upload failed"

**Problem**: Cloudinary or network issue

**Solutions**:
1. Verify Cloudinary credentials in `.env`
2. Check file size is under 5MB
3. Verify file type is supported:
   - Images: jpg, jpeg, png, gif
   - Documents: pdf, doc, docx, txt
4. Check network connection
5. Look at backend logs for specific error

### ❌ "Request Entity Too Large"

**Problem**: File is too big

**Solution**: 
- Maximum file size is 5MB
- Reduce file size before uploading
- Or update limit in `backend/routes/fileRoutes.js`:
  ```javascript
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  }
  ```

### ❌ "File type not allowed"

**Problem**: Unsupported file format

**Solution**: Update allowed formats in `backend/routes/fileRoutes.js`:
```javascript
allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'txt', 'zip'],
```

### ❌ Files not deleting from Cloudinary

**Problem**: cloudinaryId incorrect or permissions

**Solutions**:
1. Verify Cloudinary credentials
2. Check API secret is correct
3. Look for error in backend console
4. Manually delete from Cloudinary dashboard if needed

---

## Authentication Issues

### ❌ "Invalid credentials"

**Problem**: Wrong email or password

**Solution**: 
- Verify email is correct
- Check password (case-sensitive)
- Try signing up again if account doesn't exist

### ❌ "Not authorized" error

**Problem**: Missing or invalid token

**Solutions**:
1. Login again (token may be expired)
2. Clear localStorage:
   ```javascript
   // In browser console
   localStorage.clear();
   ```
3. Check token is being sent in headers
4. Verify JWT_SECRET is same in backend

### ❌ Automatically logged out

**Problem**: Token expired or localStorage cleared

**Solutions**:
1. Login again
2. Token expires after 30 days by default
3. Check browser isn't clearing localStorage

### ❌ Admin features not working

**Problem**: User role is not 'admin'

**Solution**: Update user role in database
```javascript
// In MongoDB
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

---

## Deployment Issues

### ❌ Environment variables not working in production

**Problem**: .env file not in production

**Solution**:
- Add environment variables in hosting platform dashboard
- Vercel: Settings → Environment Variables
- Render: Environment → Add variables
- Heroku: Settings → Config Vars

### ❌ CORS errors in production

**Problem**: Frontend domain not allowed

**Solution**: Update CORS in `backend/server.js`:
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
```

Add FRONTEND_URL to environment variables.

### ❌ API calls failing in production

**Problem**: Wrong API URL

**Solution**: Update `frontend/src/api/axios.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

Create `.env.production`:
```env
VITE_API_URL=https://your-backend-domain.com/api
```

### ❌ Build fails

**Solutions**:
1. Check Node version matches local
2. Verify all dependencies in package.json
3. Check build logs for specific errors
4. Test build locally:
   ```bash
   cd frontend
   npm run build
   ```

---

## General Tips

### Debugging Backend
1. Check console logs
2. Add console.log() statements
3. Use Postman to test API endpoints
4. Check MongoDB Compass for data

### Debugging Frontend
1. Open browser DevTools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for API calls
4. Use React DevTools extension

### Fresh Start
If all else fails, try a fresh install:
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Clear Everything
```bash
# Stop all servers (Ctrl+C)

# Clear node_modules
rm -rf backend/node_modules frontend/node_modules
rm -rf backend/package-lock.json frontend/package-lock.json

# Reinstall
cd backend && npm install
cd ../frontend && npm install

# Clear browser
# Browser console: localStorage.clear();
# Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
```

### Check Versions
Verify you have compatible versions:
```bash
node --version  # Should be v14 or higher
npm --version   # Should be v6 or higher
```

---

## Still Having Issues?

### Steps to Get Help

1. **Check the error message carefully**
   - Read the full error in terminal or browser console
   - Google the specific error message

2. **Check documentation**
   - README.md
   - SETUP_GUIDE.md
   - Official docs for the technology

3. **Verify environment**
   - All dependencies installed?
   - Correct Node version?
   - Environment variables set?

4. **Test incrementally**
   - Backend working? Test with Postman
   - Database connected? Check MongoDB Compass
   - Frontend loading? Check browser console

5. **Create a minimal test case**
   - Try the simplest possible setup
   - Add complexity one piece at a time

---

## Common Error Messages

| Error | Likely Cause | Quick Fix |
|-------|--------------|-----------|
| ECONNREFUSED | Server not running | Start backend server |
| EADDRINUSE | Port already in use | Change port or kill process |
| Module not found | Missing dependency | npm install |
| JWT expired | Token too old | Login again |
| 401 Unauthorized | No/invalid token | Login again |
| 403 Forbidden | Wrong permissions | Check user role |
| 404 Not found | Wrong URL/route | Check endpoint |
| 500 Server error | Backend crash | Check backend logs |
| Network error | CORS/connection issue | Check backend is running |

---

## Prevention Tips

1. **Always check .env file first** - Most issues come from here
2. **Keep dependencies updated** - Run `npm outdated` occasionally
3. **Use proper error handling** - Helps identify issues faster
4. **Test locally before deploying** - Catch issues early
5. **Read error messages completely** - They often tell you the solution
6. **Use console.log liberally** - When debugging
7. **Keep backups** - Before making major changes

---

## Need More Help?

1. Check official documentation:
   - React: https://react.dev
   - Express: https://expressjs.com
   - MongoDB: https://docs.mongodb.com
   - Cloudinary: https://cloudinary.com/documentation

2. Search on:
   - Stack Overflow
   - GitHub Issues
   - Reddit (r/reactjs, r/node)

3. Review the code:
   - All files have comments
   - Structure is straightforward
   - Follow the data flow

---

**Remember**: Most issues are simple configuration problems. Check your .env file first! 🔍

Happy debugging! 🐛
