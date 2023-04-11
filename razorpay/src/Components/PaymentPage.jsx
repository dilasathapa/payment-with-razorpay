import React from "react";
// import { useScript } from 'react-async-script-hook';
import ScriptTag from 'react-script-tag';
import Razorpay from 'react-razorpay';


function PaymentPage(){

    // useScript({
    //     src: 'https://checkout.razorpay.com/v1/checkout.js',
    //     // onLoad: handleScriptLoad,
    //   });
      const Demo = props => (
      <ScriptTag type="text/javascript" src="https://checkout.razorpay.com/v1/checkout.js" />
      )

    var options = {
        "key": "rzp_test_04a8erp9CGiYWA", // Enter the Key ID generated from the Dashboard
        "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Dilasa Thapa", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": "order_LcBF5iZXwzv7S3", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": {
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    function getPayment(){
        var rzp1 = new Razorpay(options);
        rzp1.open();
        // e.preventDefault();
    }
    
    return (
        <>
        {/* payment */}
        <button id="rzp-button1" onClick={getPayment}>Pay</button>

        </>
    )
}

export {PaymentPage};