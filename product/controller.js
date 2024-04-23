const { db } = require("../utils/dbManager");
const DBRef = require("mongodb").DBRef;
const ObjectId = require("mongodb").ObjectId;
const addProduct = async (req, res) => {
    try {
        let product = req.body;
        await db.collection("product").insertOne(product);
        res.send({
            status: "SUCCESS",
            message: "product added successfully",
            data: product
        });
    } catch (err) {
        console.log(err)
        res.send({
            status: "ERROR",
            message: "error while add product",
            data: err
        })
    }
}



const deleteProduct = async (req, res) => {
    try {
        let id = req.body.id;
        const productSnapShot = await db.collection("product").deleteOne({ "_id": new ObjectId(`${id}`) });
        res.send({
            status: "SUCCESS",
            message: "product deleted successfully",
            data: productSnapShot
        });
    } catch (err) {
        console.log(err)
        res.send({
            status: "ERROR",
            message: "error while delete product",
            data: err
        })
    }
}

const fetchProductList = async (req, res) => {
    try {
        const productSnapShot = await db.collection("product").find().toArray();
        res.send({
            status: "SUCCESS",
            message: "product fetch successfully",
            data: productSnapShot
        });
    } catch (err) {
        console.log(err)
        res.send({
            status: "ERROR",
            message: "error while fetching product",
            data: err
        })
    }
}
module.exports = {
    addProduct,
    deleteProduct,
    fetchProductList
}