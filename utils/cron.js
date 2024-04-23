const cron = require('node-cron');
const { db } = require("../utils/dbManager");
const { sendMail } = require("../utils/sendEmail");
cron.schedule('0 22 * * *', () => {
    console.log('10PM CRON JOB!');
    sendMailToAdminForReceivedOrder();
});


const sendMailToAdminForReceivedOrder = async () => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        const orders = await db.collection("orders").aggregate([
            {
                $match: {
                    orderDate: {
                        $gte: currentDate
                    }
                },
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

        let adminEmailList = [];
        const adminList = await db.collection("admin").find().toArray();
        for (const admin of adminList) {
            console.log(admin.email)
            if (admin.email) {
                adminEmailList.push(admin.email)
            }
        }
        for (const order of orders) {
            if (order.user[0].firstName && order.product[0].productName) {
                let emailObject = {
                    email: adminEmailList,
                    subject: "New order received",
                    text: `Order from ${order.user[0].firstName} for ${order.product[0].productName} today.`
                }
                console.log(emailObject)
                sendMail(emailObject)
            }

        }
        console.log("Mail send successfully.")
    } catch (err) {
        console.log(err)
    }
}

sendMailToAdminForReceivedOrder()
module.exports = {
    sendMailToAdminForReceivedOrder
}