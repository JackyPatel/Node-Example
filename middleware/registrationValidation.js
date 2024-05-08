const { query, validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    console.log('sadf');
    query(req.body.name).isEmpty();
    const result = validationResult(req);
    console.log(result);
    if (result.isEmpty()) {
        next();
    } else {
        const err = result.array();
        next(err);
    }
}