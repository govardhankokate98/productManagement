const express = require("express");
const dotenv = require('dotenv');
const userRoute = require('./user/routes');
const productRoute = require('./product/routes');
const orderRoute = require('./order/routes');
const adminRoute = require('./admin/routes');
const app = express();
dotenv.config();

const PORT = process.env.PORT;
app.use(express.json());
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);
app.use('/admin', adminRoute);

app.listen(PORT, (error) => {
    if (!error)
        console.log(`server listening ${PORT}`)
    else
        console.log("Error occurred, server can't start", error);
}
);