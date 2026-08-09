const express = require('express');
const router = express.Router();
const {
  registerHackathon,
  getMyEntry,
  deleteEntry,
} = require('../controllers/hackathonController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', protect, registerHackathon);
router.get('/my-entry', protect, getMyEntry);
router.delete('/:id', protect, deleteEntry);

module.exports = router;
