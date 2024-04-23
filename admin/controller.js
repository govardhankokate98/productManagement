const { db } = require("../utils/dbManager");
const { generateToken } = require("../utils/jwt");

const registerAdmin = async (req, res) => {
    try {
        let user = req.body;
        await db.collection("admin").insertOne(user);
        res.send({
            status: "SUCCESS",
            message: "Admin Registered successfully",
            data: user
        });
    } catch (err) {
        console.log(err)
        res.send({
            status: "ERROR",
            message: "error while admin registration",
            data: err
        })
    }
}

const loginAdmin = async (req, res) => {
    try {
        let phone = req.body.phone;
        let password = req.body.password;
        const user = await db.collection("admin").find({ phone: { $eq: phone }, password: { $eq: password } }).toArray();
        if (user.length) {
            let token = await generateToken(user[0]);
            res.send({
                status: "SUCCESS",
                message: "Admin login successfully",
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
            message: "error while admin login",
            data: err
        })
    }
}

module.exports = {
    registerAdmin,
    loginAdmin
}