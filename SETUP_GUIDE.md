# 🚀 Quick Setup Guide for Mini Drive

Follow these steps to get Mini Drive up and running in minutes!

## Step 1: Get MongoDB Ready

### Option A: MongoDB Atlas (Cloud - Recommended for beginners)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Replace `<password>` with your database password
7. Add `/mini-drive` at the end: `mongodb+srv://username:password@cluster.mongodb.net/mini-drive`

### Option B: Local MongoDB

1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - Windows: MongoDB should auto-start
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
3. Your connection string will be: `mongodb://localhost:27017/mini-drive`

## Step 2: Get Cloudinary Credentials

1. Go to https://cloudinary.com/users/register/free
2. Sign up for a free account
3. After signing in, go to the Dashboard
4. You'll see:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
5. Keep these handy - you'll need them in the next step!

## Step 3: Configure Backend Environment Variables

1. Open `backend/.env` file
2. Fill in your credentials:

```env
PORT=5001
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/mini-drive
JWT_SECRET=my_super_secret_key_12345_change_this_in_production

CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Important Notes:**
- Don't use quotes around the values
- Make sure there are no spaces before or after the `=` sign
- Keep your JWT_SECRET secure and random (any long string works)

## Step 4: Start the Backend

Open a terminal and run:

```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5001
MongoDB Connected: ...
```

✅ If you see this, your backend is ready!

## Step 5: Start the Frontend

Open a **NEW terminal** (keep the backend running) and run:

```bash
cd frontend
npm run dev
```

You should see:
```
Local: http://localhost:5173/
```

✅ Your app is now running!

## Step 6: Test the Application

1. Open your browser and go to: **http://localhost:5173**
2. Click "Sign Up"
3. Create a new account:
   - Name: Your Name
   - Email: test@example.com
   - Password: test123 (or any password 6+ characters)
4. You'll be redirected to the dashboard
5. Try uploading a file!

## Creating an Admin User

After creating a regular user, you can promote them to admin:

### Using MongoDB Compass (GUI):
1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Connect to your database
3. Find the `users` collection
4. Find your user and edit it
5. Change `role` from `"user"` to `"admin"`
6. Save changes
7. Log out and log back in

### Using Terminal:
If using MongoDB Atlas, use the web shell in the Atlas UI, or if local:

```bash
mongosh

use mini-drive

db.users.updateOne(
  { email: "test@example.com" },
  { $set: { role: "admin" } }
)
```

## Common Issues & Solutions

### ❌ "Cannot connect to MongoDB"
- **Solution**: Check your MONGO_URI in `.env`
- For Atlas: Make sure your IP is whitelisted (Network Access in Atlas)
- For Local: Make sure MongoDB service is running

### ❌ "Cloudinary upload failed"
- **Solution**: Verify your Cloudinary credentials in `.env`
- Make sure Cloud Name, API Key, and API Secret are correct
- No quotes or spaces around the values

### ❌ "Port 5001 already in use"
- **Solution**: Change PORT in `.env` to something else like 5002
- Update frontend API URL in `frontend/src/api/axios.js` accordingly

### ❌ "Failed to fetch" on login/signup
- **Solution**: Make sure backend is running on port 5001
- Check browser console for errors
- Verify CORS is enabled (it should be by default)

### ❌ Frontend shows blank page
- **Solution**: Check browser console for errors
- Make sure all dependencies are installed: `npm install` in frontend folder
- Try clearing browser cache

## File Upload Limits

- Maximum file size: **5MB**
- Supported formats:
  - Images: JPG, JPEG, PNG, GIF
  - Documents: PDF, DOC, DOCX, TXT

## Default Ports

- Backend API: **http://localhost:5001**
- Frontend: **http://localhost:5173**

## Need More Help?

Check the main README.md for detailed documentation!

---

Happy coding! 🎉
