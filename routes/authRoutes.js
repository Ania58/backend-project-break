const Product = require('../models/Product')
const path = require('path')
const express = require('express')
const router = express.Router()
const admin = require('firebase-admin');
const authMiddleware = require('../middlewares/authMiddleware')
const auth = admin.auth();

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views', 'register.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views', 'login.html'));
});


router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
      await auth.createUser({
        email,
        password
      });
      res.redirect('/login');
    } catch (error) {
      console.error('Error creating new user:', error);
      res.redirect('/register');
    }
  });


  router.post('/login', async (req, res) => {
    const { idToken } = req.body;
    try {
        await auth.verifyIdToken(idToken);
        res.cookie('token', idToken, { httpOnly: true, secure: false }); 
        res.json({ success: true });
    } catch {
        console.error('Error verifying ID token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
  
})

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
  });
  

  module.exports = router;