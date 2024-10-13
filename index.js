const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');
const firebase = require('./config/firebase')

require('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert(firebase),
  });

const app = express();
const PORT = 8080;

const { dbConnection} = require('./config/db.js');

const productRoutes = require('./routes/productRoutes.js');
const authRoutes = require('./routes/authRoutes.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', productRoutes, authRoutes);


dbConnection();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));