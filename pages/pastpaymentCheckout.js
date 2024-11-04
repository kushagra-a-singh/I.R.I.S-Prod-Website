import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // Use useRouter for navigation
import { supabase } from '../supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './paymentCheckout.css';

const CheckoutPayment = () => {
    const router = useRouter();
    const { formData } = router.query; // Use router.query to access query params

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
        let amount = 250; // Amount in INR
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return false;
        }

        return new Promise((resolve, reject) => {
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY, // Use NEXT_PUBLIC_ prefix for environment variables in Next.js
                amount: parseInt(amount * 100), // Amount in paise
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
                                router.push(`/PaymentSuccess?reference=${razorpay_payment_id}`); // Use router.push for navigation
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
                    <img src="/rp.png" alt="Razorpay" />
                </div>
                <p className="terms-conditions">*Terms & Conditions apply*</p>
            </div>
        </div>
    );
};

export default CheckoutPayment;
