const express = require('express');
const config = require('./database/config');
require('dotenv').config();
const { APP_PORT } = process.env;
const app = new express();
app.use(express.json());

//--- Serving static files
app.use(express.static('public'));
const customErrorHandler = require('./utils/customErrorHandler');

//---App Routes
const userRoutes = require('./routes/user.route');
app.use('/api/auth', userRoutes);

const productRoutes = require('./routes/product.route');
app.use('/api/products', productRoutes);

//--- 404
app.all('*', function(req, res, next) {
    const err = new Error(`Path ${req.originalUrl} you are looking on not exist on server`);
    err.statusCode = 404;
    return next(err);
});

//--- Handle custom exception 
app.use(customErrorHandler);

//--- Server Run
app.listen(APP_PORT, function(){
    console.log(`App is running on port ${APP_PORT}`);
});
