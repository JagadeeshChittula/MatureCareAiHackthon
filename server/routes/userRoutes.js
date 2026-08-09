const express = require('express');
const router = express.Router();
const { getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, getMe);
router.put('/update', protect, updateProfile);

module.exports = router;
