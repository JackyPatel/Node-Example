const fs = require('fs');
const path = require('path');
const models = require('../models/index.model');
const Product = models.Product;
const asyncHandler = require('./../utils/asyncHandler');

exports.list = asyncHandler(async (req, res, next) => {
    const products = await Product.findAll();
    res.status(200).json({ data: products, message: 'Success' });
});

exports.store = asyncHandler(async (req, res, next) => {
    const product = await Product.create({ ...req.body, image: req.file?.filename || "" });
    const statusCode = 200;
    res.status(statusCode).json({ statusCode, message: 'success', data: product });
})

exports.show = asyncHandler(async (req, res, next) => {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if(!product) {
        const err = new Error(`Record not found for ${req.originalUrl}`);
        err.statusCode = 404;
        return next(err);
    }
    const statusCode = 200;
    res.status(statusCode).json({ statusCode, message: 'success', data: product });
})

exports.update = asyncHandler(async (req, res, next) => {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if(!product) {
        const err = new Error(`Record not found for ${req.originalUrl}`);
        err.statusCode = 404;
        return next(err);
    }
    if(req.file?.filename) {
        var filePath = path.join(__dirname, '..', 'public', product.image);
        fs.unlinkSync(filePath);
    }
    await Product.update({ ...req.body, image: req.file?.filename || "" }, { where: { id: req.params.id } });
    const statusCode = 200;
    res.status(statusCode).json({ statusCode, message: 'success' });
})

exports.delete = asyncHandler(async (req, res, next) => {
    await Product.destroy({ where: { id: req.params.id } });
    const statusCode = 200;
    res.status(statusCode).json({ statusCode, message: 'Product deleted successfull.' });
})