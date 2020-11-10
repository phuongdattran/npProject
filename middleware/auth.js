const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //const token = req.headers.authorization.split(' ')[1];
        const token = req.cookies['token'];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
res.status(401).redirect('/');
    }
};