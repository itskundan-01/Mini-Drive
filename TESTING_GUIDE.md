# 🧪 Testing Guide for Mini Drive Enhancements

## Quick Start Testing

### 1. Restart Your Servers (Important!)

Since we added new backend routes, you need to restart the backend server:

```bash
# Terminal 1 - Backend
cd backend
# Stop the current server (Ctrl+C if running)
npm start

# Terminal 2 - Frontend
cd frontend
# If not running, start with:
npm run dev
```

### 2. Open the Application

Navigate to: `http://localhost:5173`

---

## 🎯 Test Scenarios

### Scenario 1: Test Admin User Management

**Prerequisites:** You need an admin account (you already have admin@minidrive.com)

**Steps:**
1. Login as admin user (admin@minidrive.com)
2. You should see the Admin Dashboard
3. Notice the new UI with gradients and better design
4. Click on "User Management" tab
5. You should see a table with all users
6. Try to promote a regular user to admin:
   - Click "Promote" button next to a regular user
   - Confirm the action
   - The badge should change from green "user" to purple "admin"
7. Try to demote that user back:
   - Click "Demote" button
   - Confirm the action
   - Badge should change back to green "user"
8. Try to demote yourself:
   - Click "Demote" on your own account
   - You should see an error: "You cannot demote yourself"

**Expected Results:**
- ✅ User management tab loads with all users
- ✅ Promote/Demote buttons work
- ✅ Role badges update in real-time
- ✅ Self-demotion is prevented
- ✅ Success/error toasts appear

---

### Scenario 2: Test Dashboard Navigation Toggle

**Prerequisites:** Logged in as admin

**Steps:**
1. From Admin Dashboard, look at top-right corner
2. You should see a button "My Files 📊"
3. Click on it
4. You should be redirected to your personal dashboard (user view)
5. Look at top-right corner again
6. Now you should see "Admin Panel ⚙️" button
7. Click it to go back to admin dashboard

**Expected Results:**
- ✅ Toggle button appears in navbar
- ✅ Button text changes based on current page
- ✅ Navigation works smoothly
- ✅ Correct dashboard loads

---

### Scenario 3: Test Platform Statistics

**Prerequisites:** Logged in as admin

**Steps:**
1. Go to Admin Dashboard
2. Make sure you're on "Overview" tab
3. Check the statistics cards at the top:
   - Total Users (should show count + new users in 7 days)
   - Total Files (should show count + new files in 7 days)
   - Total Storage (should show size + avg files per user)
   - Admins (should show admin count + regular users)
4. Scroll down to see:
   - Recent Activity section
   - Platform Health section
   - Quick Actions panel
5. Click "Refresh Data" in Quick Actions
6. All stats should update

**Expected Results:**
- ✅ All statistics display correctly
- ✅ Numbers match actual data
- ✅ Recent activity shows last 7 days
- ✅ Refresh button updates data

---

### Scenario 4: Test Drag & Drop Upload

**Prerequisites:** Logged in as any user

**Steps:**
1. Go to your Dashboard (user view)
2. Click "Upload New File" button
3. Upload area should appear
4. Try drag & drop:
   - Open file explorer
   - Drag a file (under 5MB) over the upload area
   - Border should turn blue
   - Drop the file
   - You should see file preview with icon, name, size, type
5. Click "Upload to Cloud" button
6. Watch the progress bar fill up
7. File should appear in your file list below

**Expected Results:**
- ✅ Drag area responds to drag events
- ✅ Border color changes when dragging
- ✅ File preview shows after drop
- ✅ Progress bar animates during upload
- ✅ Success toast appears
- ✅ File list refreshes with new file

---

### Scenario 5: Test Enhanced File Display

**Prerequisites:** User has uploaded files

**Steps:**
1. Go to your Dashboard
2. Check the "Your File Collection" section
3. You should see boxes showing file type breakdown
4. Scroll to "Your Files" section
5. Files should display as cards (not table)
6. Hover over a file card:
   - Card should lift slightly
   - Shadow should increase
7. Look at the card header:
   - Should have gradient based on file type
   - Images should show thumbnail
8. Click "View" button on a file
9. File should open in new tab
10. Click "Delete" button on a file
11. Confirm deletion
12. File should disappear

**Expected Results:**
- ✅ File type breakdown displays correctly
- ✅ Files show as cards with gradients
- ✅ Hover effects work smoothly
- ✅ Images show preview in card
- ✅ View button opens file
- ✅ Delete button removes file
- ✅ File list updates after deletion

---

### Scenario 6: Test User Dashboard Enhancements

**Prerequisites:** Logged in as regular user

**Steps:**
1. Go to Dashboard
2. Check welcome message:
   - Should say "Welcome, [Your Name]!"
   - Wave emoji should be visible
3. Check statistics cards:
   - Total Files (should be accurate)
   - Storage Used (should show formatted size)
   - File Types (should show unique type count)
4. Upload a few different file types
5. File Collection section should update
6. Try the collapsible upload:
   - Click "Upload New File" button
   - Upload area expands
   - Click X button to close
   - Upload area collapses

**Expected Results:**
- ✅ Personalized welcome message
- ✅ Accurate statistics
- ✅ File collection updates dynamically
- ✅ Upload area toggles smoothly

---

### Scenario 7: Test Admin File View

**Prerequisites:** Logged in as admin

**Steps:**
1. Go to Admin Dashboard
2. Click "All Files" tab
3. You should see all files from all users
4. Each file card should show:
   - File name, size, date
   - User name and email (owner)
   - File type badge
5. Try viewing a file from another user
6. Try deleting a file from another user
7. Confirm deletion
8. File should be removed

**Expected Results:**
- ✅ All files visible (from all users)
- ✅ User information displays on each card
- ✅ Admins can view any file
- ✅ Admins can delete any file
- ✅ File list updates after deletion

---

### Scenario 8: Test User Deletion (Cascade)

**Prerequisites:** Logged in as admin, test user with uploaded files

**Steps:**
1. Create a new test user account (or use existing)
2. Upload 2-3 files with that test user
3. Logout and login as admin
4. Go to Admin Dashboard → User Management tab
5. Find the test user in the table
6. Note the file count for that user
7. Click "Delete" button for that user
8. Warning message should mention files will be deleted
9. Confirm deletion
10. Go to "All Files" tab
11. Files from deleted user should be gone

**Expected Results:**
- ✅ Delete button shows cascade warning
- ✅ User is removed from database
- ✅ User's files are deleted from Cloudinary
- ✅ User's files disappear from file list
- ✅ Success toast confirms deletion

---

### Scenario 9: Test Home Page Redesign

**Prerequisites:** None (logged out view)

**Steps:**
1. Logout if logged in
2. Go to home page (http://localhost:5173)
3. Check the hero section:
   - Cloud emoji should bounce
   - Title should have gradient colors
   - Two buttons: "Get Started Free" and "Login"
4. Hover over buttons:
   - Buttons should scale up slightly
   - Shadows should enhance
5. Scroll down to feature cards:
   - Three cards with gradient icons
   - Cards should lift on hover
6. Scroll to "For Users" and "For Admins" sections:
   - Gradient backgrounds
   - Checkmark lists
7. Check final CTA section:
   - "Ready to get started?" heading
   - Large "Create Free Account" button

**Expected Results:**
- ✅ Cloud emoji animates (bounces)
- ✅ Gradient text displays correctly
- ✅ All hover effects work
- ✅ Feature cards lift on hover
- ✅ Gradient backgrounds show properly
- ✅ Layout is responsive

---

### Scenario 10: Test Mobile Responsiveness

**Prerequisites:** Any user logged in

**Steps:**
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Select "iPhone 12 Pro" or similar
4. Navigate through:
   - Home page
   - Login page
   - Dashboard
   - Admin dashboard
5. Check that:
   - Navigation collapses properly
   - Cards stack vertically
   - Buttons are large enough to tap
   - Text is readable
   - No horizontal scroll

**Expected Results:**
- ✅ Single column layout on mobile
- ✅ Touch-friendly button sizes
- ✅ Readable font sizes
- ✅ No layout breaking
- ✅ All features accessible

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot read property of undefined" error

**Solution:** Make sure you restarted the backend server after adding new routes.

```bash
cd backend
# Stop server (Ctrl+C)
npm start
```

### Issue 2: Admin routes return 404

**Solution:** Check that `/backend/server.js` includes:
```javascript
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);
```

### Issue 3: User role doesn't update

**Solution:** 
1. Check MongoDB connection
2. Verify JWT token is valid
3. Check browser console for errors
4. Try logging out and back in

### Issue 4: Gradients not showing

**Solution:** 
1. Clear browser cache
2. Hard reload (Ctrl+Shift+R or Cmd+Shift+R)
3. Check Tailwind CSS is working (other styles should show)

### Issue 5: Drag & drop not working

**Solution:**
1. Check browser console for JavaScript errors
2. Try with different file (under 5MB)
3. Make sure file type is supported
4. Try clicking "Browse Files" instead

### Issue 6: Images not previewing in file cards

**Solution:**
1. Verify Cloudinary URLs are accessible
2. Check network tab for failed image requests
3. Ensure file type is actually an image
4. Try re-uploading the image

---

## ✅ Checklist: Features to Test

### Admin Features
- [ ] Login as admin user
- [ ] View Admin Dashboard
- [ ] Check Overview tab statistics
- [ ] Switch to User Management tab
- [ ] View all users in table
- [ ] Promote user to admin
- [ ] Demote admin to user
- [ ] Try to demote self (should fail)
- [ ] Delete a test user
- [ ] Verify cascade delete (files gone too)
- [ ] Switch to All Files tab
- [ ] View files from all users
- [ ] Delete any file as admin
- [ ] Use dashboard toggle (Admin Panel ⚙️ ↔ My Files 📊)
- [ ] Refresh data button works

### User Features
- [ ] Login as regular user
- [ ] View personalized dashboard
- [ ] Check statistics cards
- [ ] View file type breakdown
- [ ] Click "Upload New File"
- [ ] Drag and drop a file
- [ ] See upload progress
- [ ] File appears in list
- [ ] Browse files button works
- [ ] View a file
- [ ] Delete a file
- [ ] Upload area toggle (open/close)
- [ ] File cards have proper gradients
- [ ] Image files show preview

### UI/UX
- [ ] All gradients render properly
- [ ] Hover effects are smooth
- [ ] Animations don't lag
- [ ] Cards lift on hover
- [ ] Buttons scale on hover
- [ ] Loading spinners show during async operations
- [ ] Toast notifications appear for actions
- [ ] Error messages are clear
- [ ] Success messages confirm actions
- [ ] Empty states display when appropriate

### Responsive Design
- [ ] Test on mobile (375px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1920px width)
- [ ] Navigation works on all sizes
- [ ] Cards stack properly on mobile
- [ ] Text is readable on all devices
- [ ] Buttons are touch-friendly on mobile
- [ ] No horizontal scrolling

---

## 📊 Performance Checks

### Load Times
- [ ] Dashboard loads in < 2 seconds
- [ ] File list loads in < 2 seconds
- [ ] File upload completes in reasonable time
- [ ] Page transitions are smooth
- [ ] No janky animations

### Network
- [ ] Check Network tab in DevTools
- [ ] No failed requests (except expected 401s when logged out)
- [ ] Images load properly
- [ ] API responses are quick (< 500ms for simple requests)

### Console
- [ ] No JavaScript errors in console
- [ ] No React warnings
- [ ] No 404 errors for assets

---

## 🎉 Success Criteria

Your testing is successful if:
1. ✅ All admin features work without errors
2. ✅ User management (promote/demote/delete) functions correctly
3. ✅ Dashboard navigation toggle works for admins
4. ✅ Drag & drop file upload works smoothly
5. ✅ All UI enhancements render properly (gradients, animations)
6. ✅ Statistics display accurate data
7. ✅ Mobile responsive design works
8. ✅ No console errors during normal usage
9. ✅ Toast notifications appear for all actions
10. ✅ File operations (upload/view/delete) work reliably

---

## 📝 Reporting Issues

If you find any issues:

1. **Note the steps to reproduce**
2. **Take a screenshot if UI-related**
3. **Check browser console for errors**
4. **Note which user role you were using (admin/user)**
5. **Check if backend server is running**

---

## 🚀 Ready to Test!

You're all set! Start with Scenario 1 and work through the test cases. 

**Happy Testing! 🧪✨**
