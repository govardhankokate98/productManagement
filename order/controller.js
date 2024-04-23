const { db } = require("../utils/dbManager");
const ObjectId = require("mongodb").ObjectId;
const DBRef = require("mongodb").DBRef;
const { sendMailToAdminForReceivedOrder } = require("../utils/cron");
const createOrder = async (req, res) => {
    try {
        let reqObj = req.body;
        let orderObj = {
            userId: new ObjectId(`${reqObj.userId}`),
            productId: new ObjectId(`${reqObj.productId}`),
            user: new DBRef("user", new ObjectId(`${reqObj.userId}`)),
            product: new DBRef("product", new ObjectId(`${reqObj.productId}`)),
            orderDate: new Date(),
            createdOn: new Date(),
            status: "inProgress"
        }
        await db.collection("orders").insertOne(orderObj);
        res.send({
            status: "SUCCESS",
            message: "order product successfully",
            data: orderObj
        });
    } catch (err) {
        console.log(err)
        res.send({
            status: "ERROR",
            message: "error while order product",
            data: err
        })
    }
}

const fetchUserOrder = async (req, res) => {
    try {
        let reqObj = req.query;
        const orderObj = await db.collection("orders").aggregate([
            {
                $match: { userId: new ObjectId(`${reqObj.userId}`) },
            },
            {
                $lookup: {
                    from: "user",
                    localField: "user.$id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $lookup: {
                    from: "product",
                    localField: "product.$id",
                    foreignField: "_id",
                    as: "product",
                }

            }
        ]).toArray();
        if (orderObj.length) {
            res.send({
                status: "SUCCESS",
                message: "order fetch successfully",
                data: orderObj
            });
        } else {
            res.send({
                status: "ERROR",
                message: "No order data found",
                data: orderObj
            });
        }

    } catch (err) {
        console.log(err)
        res.send({
            status: "ERROR",
            message: "error while fetch product",
            data: err
        })
    }
}

const fetchAllOrder = async (req, res) => {
    try {

        const orderObj = await db.collection("orders").aggregate([
            {
                $match: {},
            },
            {
                $lookup: {
                    from: "user",
                    localField: "user.$id",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $lookup: {
                    from: "product",
                    localField: "product.$id",
                    foreignField: "_id",
                    as: "product",
                }

            }
        ]).toArray();
        if (orderObj.length) {
            res.send({
                status: "SUCCESS",
                message: "order fetch successfully",
                data: orderObj
            });
        } else {
            res.send({
                status: "ERROR",
                message: "No order data found",
                data: orderObj
            });
        }

    } catch (err) {
        console.log(err)
        res.send({
            status: "ERROR",
            message: "error while fetch product",
            data: err
        })
    }
}
module.exports = {
    createOrder,
    fetchUserOrder,
    fetchAllOrder
}