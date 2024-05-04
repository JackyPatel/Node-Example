const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user.controller');
const registrationValidation = require('./../middleware/registrationValidation');

// router.use(registrationValidation);

router.post('/register', userController.register)
        .post('/login', userController.login);

module.exports = router;