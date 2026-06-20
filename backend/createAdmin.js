const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Admin credentials - CHANGE THESE TO YOUR PREFERENCE!
const ADMIN_USERNAME = 'MinJun';
const ADMIN_PASSWORD = 'MyPortfolio123';

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Define schema inline to avoid model conflicts
    const adminSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });

    // Create model
    const Admin = mongoose.model('Admin', adminSchema);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });
    if (existingAdmin) {
      console.log('✅ Admin already exists!');
      console.log(`Username: ${ADMIN_USERNAME}`);
      console.log('');
      console.log('🌐 Login at: http://localhost:3000/admin/login');
      process.exit(0);
    }

    // Hash password manually
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Create admin with hashed password
    const admin = new Admin({
      username: ADMIN_USERNAME,
      password: hashedPassword
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log(`Username: ${ADMIN_USERNAME}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log('');
    console.log('🌐 Login at: http://localhost:3000/admin/login');
    console.log('');
    console.log('⚠️  IMPORTANT: Delete this file after creating admin for security!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

createAdmin();
