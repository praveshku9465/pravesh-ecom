const config = require('config');
const secret = config.get('secretOrKey');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg : "No token, authorization denied"})
    }
    console.log('token ===> ', token);
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({msg : 'Token is not valid'});
    }
}