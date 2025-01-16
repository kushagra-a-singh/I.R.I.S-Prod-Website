import React from 'react';
import './terms.module.css';

function Terms() {
  return (
    <div className="terms">
      <main>
        <div className='terms-container'>
          <h1>Terms and Conditions</h1>
          <h3>By using our website, you agree to these terms and conditions. Please read them carefully before using our website.</h3>
          
          <div className='cards-container'>
            <div className="policy-card">
              <h2>Eligibility</h2>
              <p>To participate in I.R.I.S activities, you must be at least 16 years old or have parental consent if under 16. By participating, you confirm that you meet these eligibility requirements.</p>
            </div>

            <div className="policy-card">
              <h2>Code of Conduct</h2>
              <p>All participants must adhere to our Code of Conduct. This includes respectful behavior towards others, compliance with all event rules, and avoiding any form of harassment or discrimination.</p>
            </div>

            <div className="policy-card">
              <h2>Use of Our Website</h2>
              <p>You must use our website for lawful purposes only. You must not use our website to harm or offend others.</p>
            </div>

            <div className="policy-card">
              <h2>Intellectual Property</h2>
              <p>All content on our website is owned by us or our licensors. You must not copy, modify, or distribute our content without our permission. Any intellectual property created during I.R.I.S activities remains the property of the creator. By participating, you grant I.R.I.S a non-exclusive license to use your work for promotional purposes.</p>
            </div>

            <div className="policy-card">
              <h2>Liability</h2>
              <p>We are not liable for any damages or losses arising from your use of our website. We are not responsible for any third-party content or services. I.R.I.S is not liable for any direct, indirect, incidental, or consequential damages arising from your participation in our activities or use of our services.</p>
            </div>

            <div className="policy-card">
              <h2>Privacy Policy</h2>
              <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.</p>
            </div>

            <div className="policy-card">
              <h2>Changes to Terms</h2>
              <p>We may update these Terms and Conditions from time to time. Any changes will be posted on our website, and your continued use of our services constitutes acceptance of the new terms.</p>
            </div>

            <div className="policy-card">
              <h2>Governing Law</h2>
              <p>These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms will be resolved in the courts of India.</p>
            </div>

            <div className="policy-card">
              <h2>Contact Us</h2>
              <p>If you have any questions or concerns about these Terms and Conditions, please contact us at iris@mitwpu.edu.in.</p>
              <p>Address: MIT World Peace University Survey No, 124, Paud Rd, Kothrud, Pune, Maharashtra 411038</p>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
}

export default Terms;
