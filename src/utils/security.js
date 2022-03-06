const jwt = require('jsonwebtoken');
require('../config/dotenv');

function genetateToken(userData) {
    return jwt.sign(userData, process.env.API_SECRET, {
        expiresIn : 3600
    });
}

module.exports = {
    genetateToken : genetateToken
}