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


    const displayRazorpay = async () => {
        const res = await loadScript('http://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Offline')
            return
        }

        const data = await fetch('http://localhost:8080/create/orderId', {
            method: 'POST'
        })
            .then((result) => result.json())
        console.log(data);
        console.log(data.amount)



        var options = {
            key: "rzp_test_04a8erp9CGiYWA",
            currency: data.currency,
            amount: "50000",
            name: "DilasaThapa", //your business name
            description: "Test Transaction",
            // order_id: order_LcBF5iZXwzv7S3,
            order_id: data.id,
            handler: function (response) {
                alert(response.razorpay_payment_id)
                alert(response.razorpay_order_id)
                alert(response.razorpay_signature)
            },
            prefill: {
                name: "Gaurav Kumar", //your customer's name
                email: "gaurav.kumar@example.com",
                contact: 9000090000
            }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open();
    }



    return (
        <>
            <div id="t-parent">
                {/* <div>Items added</div> */}
                <div id="t-shirt-child">
                    <div>
                        <img src="data:image/jpeg;base64,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" alt="t shirt" />

                    </div>
                    <div>
                        <p>OLLYPOP COTTON KNIT HALF SLEEVES SOLID</p>
                        <p>₹ 499</p>
                        <button id="btnr" onClick={displayRazorpay}>
                            Pay with Razorpay
                        </button>

                    </div>
                </div>
            </div>


        </>
    )
}

export default Payment;