// Script to promote a user to admin role
// Run this with: node promoteToAdmin.js <email>

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./config/db');
const User = require('./models/userModel');

const promoteToAdmin = async (email) => {
  try {
    await connectDB();
    
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log(`❌ User with email "${email}" not found!`);
      console.log('\nAvailable users:');
      const allUsers = await User.find({}).select('email name role');
      allUsers.forEach(u => {
        console.log(`  - ${u.email} (${u.name}) - Current role: ${u.role}`);
      });
      process.exit(1);
    }
    
    if (user.role === 'admin') {
      console.log(`✅ User "${user.email}" is already an admin!`);
      process.exit(0);
    }
    
    user.role = 'admin';
    await user.save();
    
    console.log(`✅ Successfully promoted "${user.email}" to admin!`);
    console.log(`\nUser details:`);
    console.log(`  Name: ${user.name}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Role: ${user.role}`);
    console.log(`\n🎉 You can now login and access the admin dashboard at /admin/dashboard`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.log('❌ Please provide an email address');
  console.log('Usage: node promoteToAdmin.js <email>');
  console.log('Example: node promoteToAdmin.js admin@test.com');
  process.exit(1);
}

promoteToAdmin(email);
