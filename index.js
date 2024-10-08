const express = require('express');
const app = express();
const PORT = 8080;

const { dbConnection} = require('./config/db.js');

const routes = require('./routes/productRoutes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', routes);


dbConnection();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));