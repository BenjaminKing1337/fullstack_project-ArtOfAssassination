//joi import
const Joi = require('joi');
//jsonwebtoken import
const jwt = require('jsonwebtoken');
// register validation
const registerValidation = (data) => {
    const schema = Joi.object(
        {
            name: Joi.string().min(6).max(255).required(),
            email: Joi.string().min(6).max(255).required(),
            pass: Joi.string().min(6).max(255).required(),
        });
        return schema.validate(data);
    }    
// login validation
const loginValidation = (data) => {
    const schema = Joi.object(
        {
            email: Joi.string().min(6).max(255).required(),
            pass: Joi.string().min(6).max(255).required(),
        });
    return schema.validate(data);
}
// logic to verify our token (JWT)
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) return res.status(401).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    }
    catch (error) {
        res.status(400).json({ error: "Token is not valid" });
    }
}
// modular exportation
module.exports = { registerValidation, loginValidation, verifyToken };