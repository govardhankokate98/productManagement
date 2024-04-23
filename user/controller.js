const { db } = require("../utils/dbManager");
const { generateToken } = require("../utils/jwt");
const registerUser = async (req, res) => {
    try {
        let user = req.body;
        await db.collection("user").insertOne(user);
        res.send({
            status: "SUCCESS",
            message: "User Registered successfully",
            data: user
        });
    } catch (err) {
        console.log(err)
        res.send({
            status: "ERROR",
            message: "error while user registration",
            data: err
        })
    }
}

const loginUser = async (req, res) => {
    try {
        let phone = req.body.phone;
        let password = req.body.password;
        const user = await db.collection("user").find({ phone: { $eq: phone }, password: { $eq: password } }).toArray();
        if (user.length) {
            let token = await generateToken(user[0]);
            res.send({
                status: "SUCCESS",
                message: "User login successfully",
                data: {
                    token,
                    phone: user[0].phone,
                    id: user[0]._id
                }
            });
        } else {
            res.send({
                status: "ERROR",
                message: "Invalid password Please enter correct password",
                data: user
            });
        }

    } catch (err) {
        console.log(err)
        res.send({
            status: "ERROR",
            message: "error while user login",
            data: err
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}