import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get("reference");

    return (
        <div className="payment-success-container">
            <div className="payment-success-content">
                <img src="/logo.png" alt="Success Icon" className="success-icon" />
                <h1>Payment Successful!</h1>
                <p>Thank you for your payment. You have successfully registered for the Hackathon!</p>
                <p>Your payment ID is: <strong>{reference}</strong></p>
                <p>*PLEASE NOTE YOUR PAYMENT ID FOR FUTURE REFERENCE*</p>
                <p>Leader will receive an email shortly.</p>
                <a href="/" className="home-button">Return to Home</a>
            </div>
        </div>
    );
};

export default PaymentSuccess;
