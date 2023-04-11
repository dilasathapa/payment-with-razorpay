const express = require("express")
const Razorpay = require("razorpay")
const axios = require('axios');


const app = express();

app.use(express.json());

const razorpayKey = 'rzp_test_04a8erp9CGiYWA';
const razorpaySecret = 'y3W45cPSqA7YTSAIPUeJMilE';


const auth = {
    username: razorpayKey,
    password: razorpaySecret,
};


const data = {
    "amount": 1000000,
    "currency": "INR",
    "receipt": "Receipt no. 1",
    "notes": {
      "notes_key_1": "Tea, Earl Grey, Hot",
      "notes_key_2": "Tea, Earl Grey… decaf."
    }
  }

app.post("/create/order", (req, res) => {

    axios.post('https://api.razorpay.com/v1/orders', data, {
        auth,
    })
        .then(response => {
            console.log(response.data);
            res.send(response.data.id)
        })
        .catch(error => {
            console.error(error.message);
            res.status(403).send(error.message)
        });

})
app.get("/", (req, res)=>{
    res.send("you are at wrong page")
})

app.listen(8080, (e)=>{
    if(e){
        console.log(e)
    }else{
        console.log("server running at port http://localhost:8080")
    }
})




