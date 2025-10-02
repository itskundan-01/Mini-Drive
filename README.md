# Mini Drive - Full Stack File Uploader

A modern, full-stack file management application built with React, Node.js, Express, MongoDB, and Cloudinary.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **File Upload**: Upload images, PDFs, and documents to Cloudinary
- **File Management**: View, download, and delete your files
- **Admin Dashboard**: Admin users can view and manage all files
- **Responsive Design**: Beautiful UI with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- React Router DOM for navigation
- Tailwind CSS for styling
- Axios for API calls
- React Hot Toast for notifications

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for file storage
- Multer for file uploads
- bcryptjs for password hashing

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher) installed
2. **MongoDB** (local instance or MongoDB Atlas account)
3. **Cloudinary Account** (free tier is sufficient)
   - Sign up at https://cloudinary.com
   - Get your Cloud Name, API Key, and API Secret

## ⚙️ Installation & Setup

### 1. Clone the repository (if applicable)
```bash
cd "Mini Drive"
```

### 2. Backend Setup

```bash
cd backend

# Dependencies are already installed, but if needed:
npm install

# Configure environment variables
# Edit the .env file with your credentials:
```

**Edit `backend/.env` file:**
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here_123456789

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Important**: 
- For `MONGO_URI`, use your MongoDB connection string:
  - Local: `mongodb://localhost:27017/mini-drive`
  - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/mini-drive`
- For Cloudinary credentials, get them from your Cloudinary dashboard

### 3. Frontend Setup

```bash
cd ../frontend

# Dependencies are already installed, but if needed:
npm install
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5001`

### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## 👥 Creating Users

### Regular User
Sign up through the application at `/signup`

### Admin User
To create an admin user, you have two options:

**Option 1**: Using MongoDB Compass or mongosh
```javascript
// Connect to your database and update a user
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

**Option 2**: Register via API with Postman/cURL
```bash
curl -X POST http://localhost:5001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

## 📁 Project Structure

```
mini-drive/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── fileController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── fileModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── fileRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── axios.js
    │   │   ├── fileApi.js
    │   │   └── userApi.js
    │   ├── components/
    │   │   ├── AdminProtectedRoute.jsx
    │   │   ├── FileList.jsx
    │   │   ├── FileUpload.jsx
    │   │   ├── Navbar.jsx
    │   │   └── UserProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── AdminDashboardPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── SignupPage.jsx
    │   │   └── UserDashboardPage.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 🔑 API Endpoints

### Authentication
- `POST /api/users` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### Files
- `POST /api/files` - Upload file (protected)
- `GET /api/files/myfiles` - Get user's files (protected)
- `DELETE /api/files/:id` - Delete file (protected)
- `GET /api/files/all` - Get all files (admin only)

## 🎨 Features Breakdown

### User Features
- ✅ Secure authentication with JWT
- ✅ Upload files up to 5MB
- ✅ View uploaded files with thumbnails
- ✅ Download files
- ✅ Delete own files
- ✅ Responsive dashboard

### Admin Features
- ✅ View all uploaded files
- ✅ See which user uploaded each file
- ✅ Delete any file
- ✅ View platform statistics
- ✅ Total files, users, and storage usage

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes on frontend and backend
- Role-based access control
- File type validation
- File size limits

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify .env file has correct credentials
- Ensure port 5001 is not in use

### Frontend won't start
- Check if backend is running on port 5001
- Verify all dependencies are installed
- Clear node_modules and reinstall if needed

### File upload fails
- Verify Cloudinary credentials in .env
- Check file size (must be < 5MB)
- Ensure file type is supported

### Cannot login
- Check MongoDB connection
- Verify user exists in database
- Check JWT_SECRET is set in .env

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5001
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_cloudinary_key>
CLOUDINARY_API_SECRET=<your_cloudinary_secret>
```

## 🎯 Future Enhancements

- [ ] File sharing between users
- [ ] Folder organization
- [ ] Search functionality
- [ ] File versioning
- [ ] Bulk file operations
- [ ] User profile management
- [ ] Email notifications
- [ ] File preview for more types
- [ ] Dark mode

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using React, Node.js, MongoDB, and Cloudinary
