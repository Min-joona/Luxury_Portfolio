require('dotenv').config();
const mongoose = require('mongoose');
const runSeed = require('./seedRunner');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for local seeding...');
    const result = await runSeed();
    console.log('Seeding finished successfully:', result);
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
})();
