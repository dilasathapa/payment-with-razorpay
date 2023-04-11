import React from "react";

function Payment() {

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }

            script.onerror = () => {
                resolve(false)
            }

            document.body.appendChild(script)
        })
    }


    const displayRazorpay = async (amount) => {
        const res = await loadScript('http://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Offline')
            return
        }

        const data = fetch('http://localhost:8080/create/orderId',{
            method: 'POST'
        })
        .then((res)=> res.json())
        console.log(data);


        var options = {
            "key": "rzp_test_04a8erp9CGiYWA", // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Dilasa Thapa", //your business name
            "description": "Test Transaction",
            "order_id": "order_LcBF5iZXwzv7S3",
            handler: function(response){
                alert(response.razorpay_payment_id)
                alert(response.razorpay_order_id)
                alert(response.razorpay_signature)
            },
            "prefill": {
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            }
            // ,
            // "notes": {
            //     "address": "Razorpay Corporate Office"
            // },
            // "theme": {
            //     "color": "#3399cc"
            // }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open();
    }



    return (
        <>
            payment
            <button onClick={displayRazorpay}>
                Pay with Razorpay
            </button>
        </>
    )
}

export default Payment;