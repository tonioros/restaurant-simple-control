const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mesasRouter = require('./routes/mesas');
const customerRouter = require('./routes/customers');
const orderTypeRouter = require('./routes/order-type');
const prodCategoryRouter = require('./routes/product-category');
const preOrderRouter = require('./routes/pre-order');
const productsRouter = require('./routes/products');
const connectDataBase = require('./configuration/database/connection-database');

const app = express();

// Connect to MySQL Database
connectDataBase.connect();

app.set('view engine', 'ejs');
app.listen(8080);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tables', mesasRouter);
app.use('/customers', customerRouter);
app.use('/order-type', orderTypeRouter);
app.use('/product-category', prodCategoryRouter);
app.use('/pre-order', preOrderRouter);
app.use('/products', productsRouter);

module.exports = app;
