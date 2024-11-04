import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import './pastPaymentSuccess.css';

const PaymentSuccess = () => {
    const router = useRouter();
    const { reference } = router.query;

    return (
        <div className="payment-success-container">
            <div className="payment-success-content">
                <Image src="/logo.png" alt="Success Icon" className="success-icon" width={100} height={100} />
                <h1>Payment Successful!</h1>
                <p>Thank you for your payment. You have successfully registered for the Hackathon!</p>
                <p>Your payment ID is: <strong>{reference}</strong></p>
                <p>*PLEASE NOTE YOUR PAYMENT ID FOR FUTURE REFERENCE*</p>
                <p>Leader will receive an email shortly.</p>
                <Link href="/">
                    <a className="home-button">Return to Home</a>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
