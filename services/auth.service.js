const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtKey } = process.env;

class Auth {
    constructor() {}

    static hashPassword(string) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(string, salt);
        return hash;
    }

    static matchPassword(password, hashValue) {
        return bcrypt.compare(password, hashValue);
    }

    static generateToken(user) {
        return jwt.sign({ userId: user.id, email: user.email }, jwtKey, { expiresIn: '30 days' });
    }
}

module.exports = Auth;