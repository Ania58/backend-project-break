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

const getDashboard = (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
  const mail = req.user.email;
  res.send(`
    <!DOCTYPE html>
      <html lang="eng">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard</title>
      </head>
      <body>
        <h1>Hello ${mail}</h1>
        <form action="/logout" method="post">
          <button type="submit">Logout</button>
        </form>
      </body>
    </html>
  `);
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
  getDashboard,
  registerUser,
  loginUser,
  logoutUser
};