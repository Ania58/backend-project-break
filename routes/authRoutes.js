const path = require('path')
const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const authController = require('../controllers/authController');


router.get('/', authController.redirectToLogin);

router.get('/register', authController.getRegisterPage);

router.get('/login', authController.getLoginPage);

router.get('/logout', authController.logoutUser);

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/logout', authController.logoutUser);

module.exports = router;