const express = require('express')
const shortid = require('shortid')
const app = express()

const bodyparser = require('body-parser')
const Razorpay = require('razorpay')
const cors = require('cors')
app.use(cors());


app.use(require('body-parser').json());

var instance = new Razorpay({
    key_id: 'rzp_test_04a8erp9CGiYWA',
    key_secret: 'y3W45cPSqA7YTSAIPUeJMilE'
})




app.post('/create/orderId', async(req, res) =>{
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

    const payment_capture =1
    const amount =5
    const currency = 'INR'

    const options = {
        amount:(amount*100),
        currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        const response = await instance.orders.create(options)
        console.log(response)
        res.send('ok')
    } catch (error) {
        console.log(error)
    }
    
    
})

app.listen(8080, (e)=>{
    if(e){
        console.log(e)
    }else{
        console.log("server running at port http://localhost:8080")
    }
})
