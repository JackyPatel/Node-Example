const models = require('../models/index.model');
const User = models.User;
const asyncHandler = require('./../utils/asyncHandler');
const Auth = require('./../services/auth.service');

exports.register = asyncHandler(async (req, res, next) => {
    const user = await User.create({ ...req.body });
    res.status(201).json({ data: user, message: 'Success' });
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: {email: email } });
    
    if(user) {
        const matchResult = await Auth.matchPassword(password, user.password);
        
        if(matchResult) {
            const token = await Auth.generateToken(user);
            var data = {id: user.id, name: user.name, email: user.email, };
            data.token = token;
            const statusCode = 200;
            res.status(statusCode).json({ statusCode, status: 'success', data })
        } else {
            const err = new Error(`Invalid creadentials!`);
            err.statusCode = 400;
            return next(err);
        }
    }
})