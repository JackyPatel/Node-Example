const { query, validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    query(req.body.name).notEmpty().escape();
    const result = validationResult(req);
    if (result.isEmpty()) {
        next();
    } else {
        const err = result.array();
        next(err);
    }
}