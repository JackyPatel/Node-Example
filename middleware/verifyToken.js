const jwt = require("jsonwebtoken");
const { jwtKey } = process.env;

module.exports = (req, res, next) => {
    const token = req.headers?.authorization || "";
    if(!token) {
        const err = new Error(`Unauthorized Access!`);
        err.statusCode = 401;
        return next(err);
    }
    var newToken = token.toString().replaceAll("Bearer ", "");
    var decoded = jwt.verify(newToken, jwtKey);
    if(!decoded) {
        const err = new Error(`Requested token is invalid.`);
        err.statusCode = 401;
        return next(err);
    }
    next();
}