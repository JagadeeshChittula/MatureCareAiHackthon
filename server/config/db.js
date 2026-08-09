const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`====================================================`);
    console.log(`[MongoDB Atlas Connected]: ${conn.connection.host}`);
    console.log(`[Database Name]: ${conn.connection.name}`);
    console.log(`====================================================`);
    return true;
  } catch (err) {
    console.warn(`[MongoDB Warning]: Primary Atlas connection error (${err.message}). Using Mongoose resilience layer.`);
    return false;
  }
};

module.exports = connectDB;
