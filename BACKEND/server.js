const express = require('express')
const shortid = require('shortid')
const app = express()

const bodyparser = require('body-parser')
const Razorpay = require('razorpay')
const PaySave = require('./models/payment.model')
const cors = require('cors')
const connectDatabase = require('./database')
app.use(cors());


app.use(require('body-parser').json());

var instance = new Razorpay({
    key_id: 'rzp_test_04a8erp9CGiYWA',
    key_secret: 'y3W45cPSqA7YTSAIPUeJMilE'
})

app.post("/verification", async(req, res) => {
    const secret = '23456789';

    console.log("datato send", req.body)
    const status  = req.body;
    console.log(status.entity)

    const crypto = require('crypto')
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']) {
        console.log("request is legit")
        const payment = await PaySave.create({           
            entity: status.entity,
            account_id: status.account_id,
            event: status.event,
            contains: status.contains,
            payload: status.payload,
        });

    }

    res.json({ status: 'ok' })
})




app.post('/create/orderId', async (req, res) => {
    // var options = {
    //     "key": "rzp_test_04a8erp9CGiYWA", // Enter the Key ID generated from the Dashboard
    //     "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //     "currency": "INR",
    //     "name": "Dilasa Thapa", //your business name
    //     "description": "Test Transaction",
    //     "order_id": "order_LcBF5iZXwzv7S3",
    //     "payment_capture" : "1"
    // };
    // instance.orders.create(options, function(err, order){
    //     console.log(order);
    //     res.send({orderId : order.id});
    // })

    const payment_capture = 1
    const amount = 499
    const currency = 'INR'

    const options = {
        amount: (amount * 100),
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    console.log(typeof options.amount)

    try {
        const response = await instance.orders.create(options)
        console.log("res", response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
        console.log(typeof response.amount)
    } catch (error) {
        console.log(error)
    }


})

connectDatabase().then(()=>{
    app.listen(8080, (e) => {
        if (e) {
            console.log(e)
        } else {
            console.log("server running at port http://localhost:8080")
        }
    })
    
})

