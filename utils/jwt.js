const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateToken = (req) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        phone: req.phone,
    }
    const token = jwt.sign(data, jwtSecretKey, {
        expiresIn: 100000 + "m",
    });
    return token;
}

const verifyJWTToken = (req, res, next) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let token = req.headers.authorization;
    token = token.substring(7);
    try {
        if (token) {
            jwt.verify(token, jwtSecretKey, (err, decoded) => {
                if (err) {
                    console.log(err)
                    res.send({
                        "status": "ERROR",
                        "message": "Invalid token",
                        "data": err
                    })
                } else {
                    console.log(decoded)
                    next()
                }
                // next();
            });
        }
    } catch (err) {
        console.log(err)
        res.send({
            "status": "ERROR",
            "message": "Invalid token"
        })
    }
};

module.exports = {
    generateToken,
    verifyJWTToken
}