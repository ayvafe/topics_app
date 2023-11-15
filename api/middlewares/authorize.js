const { verify } = require('../../libs/jwt-auth');
const UnauthorizedError = require('../../libs/errors/unauthorized-error');

module.exports = (req, res, next) => {
    return next();

    req.state = {};
    const { headers: { authorization } } = req;

    if (!authorization) {
        throw new UnauthorizedError();
    }

    const token = authorization.replace('Bearer ', '');

    const { userId, companyId } = verify(token, process.env.JWT_SECRET);
    req.state.user = {
        userId,
        companyId,
    };

    return next();
};