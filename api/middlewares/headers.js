function headers(req, res, next) {
    try {
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = headers;
