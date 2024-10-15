const path = require('path');
const admin = require('firebase-admin');
const auth = admin.auth();

const redirectToLogin = (req, res) => {
  res.redirect('/login');
};

const getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views', 'register.html'));
};

const getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views', 'login.html'));
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    await auth.createUser({ email, password });
    res.redirect('/login');
  } catch (error) {
    console.error('Error creating new user:', error);
    res.redirect('/register');
  }
};

const loginUser = async (req, res) => {
  const { idToken } = req.body;
  try {
    await auth.verifyIdToken(idToken);
    res.cookie('token', idToken, { httpOnly: true, secure: false });
    res.json({ success: true });
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};

module.exports = {
  redirectToLogin,
  getRegisterPage,
  getLoginPage,
  registerUser,
  loginUser,
  logoutUser
};