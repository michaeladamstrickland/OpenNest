const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Register a new user
router.post('/register', async (req, res) => {
    const { email, password, userType, preApprovalLimit } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = await User.create({ email, password, userType, preApprovalLimit });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);  // Log error details
        res.status(500).json({ error: error.message });
    }
});
// Login an existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    console.log('User model in route:', User);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json(user);
  } catch (error) {
    console.error(error); // Log error details
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    console.log('User model in route:', User);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

