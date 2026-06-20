const mongoose = require('mongoose');
const readline = require('readline');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

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

    const username = await ask('Enter admin username: ');
    const password = await ask('Enter admin password (min 8 chars): ');

    if (!username || !password || password.length < 8) {
      console.log('Username required and password must be at least 8 characters.');
      process.exit(1);
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log(`Admin "${username}" already exists.`);
      console.log('Login at: http://localhost:3000/admin/login');
      process.exit(0);
    }

    const admin = new Admin({ username, password });
    await admin.save();

    console.log(`\nAdmin "${username}" created successfully!`);
    console.log('Login at: http://localhost:3000/admin/login');
    console.log('\nDelete createAdmin.js after use for security.');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
