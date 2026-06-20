const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Create a new message
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || typeof name !== 'string' || name.trim().length < 1 || name.length > 100) {
            return res.status(400).json({ error: 'Valid name is required (1-100 chars)' });
        }
        if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 200) {
            return res.status(400).json({ error: 'Valid email is required' });
        }
        if (!message || typeof message !== 'string' || message.trim().length < 1 || message.length > 5000) {
            return res.status(400).json({ error: 'Valid message is required (1-5000 chars)' });
        }

        const newMessage = new Message({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            message: message.trim()
        });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
