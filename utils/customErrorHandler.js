const fs = require('fs');

module.exports = (err, req, res, next) => {
    if(req.file?.path) {
        fs.unlinkSync(req.file?.path)
    }
    const errObj = {};
    if(err.errors != undefined) {
        err.errors.map( er => {
            errObj[er.path] = er.message;
        })
    }
    var message = err.message || 'Something went wrong. Plesae try again later.';
    var statusCode = err.statusCode || 500;
    if(Object.keys(errObj).length > 0) {
        message = errObj;
        statusCode = 400;
    }
    const status = err.status || 'error';
    res.status(statusCode).json({ statusCode, status, message });
}