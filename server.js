const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const users = require('./routes/api/users');
const category = require('./routes/api/category');
const product = require('./routes/api/product');
const cart = require('./routes/api/cart');

const app = express();


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

  
//connect Database using mongoose
connectDB();

//Use routes
app.use('/api/users', users);
app.use('/api/category', category);
app.use('/api/product', product);
app.use('/api/cart', cart);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))