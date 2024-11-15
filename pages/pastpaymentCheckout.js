import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from '../src/utils/supabase';
import Image from 'next/image'; 
import './pastpaymentCheckout.css';

const CheckoutPayment = () => {
    const router = useRouter();
    const { formData } = router.query;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        let amount = 250;
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return false;
        }

        return new Promise((resolve, reject) => {
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
                amount: parseInt(amount * 100),
                currency: "INR",
                name: "I.R.I.S. MIT WPU",
                description: "Hackathon Registration Fee",
                image: "https://avatars.githubusercontent.com/u/160888318?v=4",
                handler: async function (response) {
                    const { razorpay_payment_id } = response;

                    if (razorpay_payment_id) {
                        try {
                            const { data, error } = await supabase
                                .from('event2_registrations')
                                .insert([{
                                    ...formData,
                                    razorpay_payment_id,
                                    created_at: new Date().toISOString()
                                }]);

                            if (error) {
                                console.error('Error inserting data:', error);
                                alert('Error inserting data');
                            } else {
                                console.log('Registration successful:', data);
                                router.push(`/PaymentSuccess?reference=${razorpay_payment_id}`); 
                            }
                        } catch (error) {
                            console.error('Error inserting data:', error);
                            alert('Error inserting data');
                        }
                    } else {
                        resolve(false);
                    }
                },
                prefill: {
                    name: formData?.leader_prn || "",
                },
                notes: {
                    address: "India",
                },
                theme: {
                    color: "#000000",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', (response) => {
                console.error('Payment failed:', response);
                resolve(false);
            });
            paymentObject.open();
        });
    };

    return (
        <div className="checkoutPayment">
            <div className="invoiceCard">
                <h1>Invoice</h1>
                <h3>*Please DO NOT Refresh until Payment Successful*</h3>
                <div className="invoiceDetails">
                    <p><strong>Event Registration Fee:</strong> INR 250</p>
                    <p><strong>Taxes:</strong> Included</p>
                    <p><strong>Total Amount:</strong> INR 250</p>
                </div>
                <button
                    onClick={handlePayment}
                    className="payButton"
                >
                    Pay Now
                </button>
                <div className="rpImage">
                    <Image 
                        src="/rp.png" 
                        alt="Razorpay" 
                        width={200} 
                        height={50} 
                    />
                </div>
                <p className="terms-conditions">*Terms & Conditions apply*</p>
            </div>
        </div>
    );
};

export default CheckoutPayment;
