const mongoose = require('mongoose');
require('dotenv').config();

const ADMIN_USERNAME = 'kimsabu32';
const ADMIN_PASSWORD = 'kimi261203';

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const adminSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    });

    const Admin = mongoose.model('Admin', adminSchema);

    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });
    if (existingAdmin) {
      console.log(`Admin "${ADMIN_USERNAME}" already exists.`);
      console.log('Login at: http://localhost:3000/admin/login');
      process.exit(0);
    }

    const admin = new Admin({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
    await admin.save();

    console.log(`Admin "${ADMIN_USERNAME}" created successfully!`);
    console.log('Login at: http://localhost:3000/admin/login');
    console.log('\nDelete createAdmin.js after use for security.');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
