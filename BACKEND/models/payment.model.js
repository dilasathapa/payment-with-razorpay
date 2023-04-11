const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    "entity": String,
    "account_id": String,
    "event": String,
    "contains": [String],
    "payload": { payment: { entity: [Object] }},
}, {

    timestamps: true
});

module.exports = mongoose.model("razorpaydata", paymentSchema);

// const aman= async() =>{
//     const payment = await PaySave.create({           
//         entity: "status.entity",
//         account_id: "status.account_id",
       
//     });
// }

// aman();



 // event: status.event,
        // contains: status.contains,
        // payload: status.payload,