const dns = require('dns');

// Configure Google Public DNS for MongoDB Atlas SRV resolution
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {
  console.warn('[DNS Notice]:', e.message);
}

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'MatruCare AI Hackathon API Portal',
    version: '1.0.0',
    contactEmail: 'matrucareai@gmail.com',
    timestamp: new Date().toISOString(),
  });
});

// Mount Route Handlers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const hackathonRoutes = require('./routes/hackathonRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/hackathon', hackathonRoutes);
app.use('/api/contact', contactRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Express Error]:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`[MatruCare AI Server] Active on port ${PORT}`);
    console.log(`[Base API Endpoint]: http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
}

module.exports = app;
