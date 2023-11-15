const jwt = require('jsonwebtoken');
const UnauthorizedError = require('./errors/unauthorized-error');

const sign = (payload, secret, tokenLifetime, tokenType = 'access') => {
    try {
        return jwt.sign(payload, secret, {
            algorithm: 'HS256',
            expiresIn: tokenLifetime,
            header: {
                tokenType,
            },
        });
    } catch (e) {
        throw new UnauthorizedError();
    }
};

const verify = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (e) {
        throw new UnauthorizedError();
    }
};

const decode = (token, secret) => {
    try {
        return jwt.decode(token, secret);
    } catch (e) {
        throw new UnauthorizedError();
    }
};

module.exports = {
    decode,
    verify,
    sign,
};
