import React, { useState } from 'react';
import './event2.css';
import Link from 'next/link';
import Image from 'next/image';

const Event2 = () => {
  const [formData, setFormData] = useState({
    team_name: '',
    leader_name: '',
    leader_phone: '',
    leader_email: '',
    leader_prn: '',
    leader_branch: '',
    member2_name: '',
    member2_phone: '',
    member2_email: '',
    member2_prn: '',
    member2_branch: '',
    member3_name: '',
    member3_phone: '',
    member3_email: '',
    member3_prn: '',
    member3_branch: '',
    member4_name: '',
    member4_phone: '',
    member4_email: '',
    member4_prn: '',
    member4_branch: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\d{10}$/;
    const prnRegex = /^\d{10}$/;

    const requiredFields = [
      'team_name', 'leader_name', 'leader_phone', 'leader_email', 'leader_prn',
      'leader_branch', 'member2_name', 'member2_phone', 'member2_email', 'member2_prn',
      'member2_branch', 'member3_name', 'member3_phone', 'member3_email', 'member3_prn',
      'member3_branch', 'member4_name', 'member4_phone', 'member4_email', 'member4_prn',
      'member4_branch'
    ];

    requiredFields.forEach((key) => {
      if (formData[key].trim() === '') {
        newErrors[key] = 'This field is required';
      }
    });

    ['leader_prn', 'member2_prn', 'member3_prn', 'member4_prn'].forEach((key) => {
      if (!prnRegex.test(formData[key])) {
        newErrors[key] = 'Enter valid PRN';
      }
    });

    ['leader_phone', 'member2_phone', 'member3_phone', 'member4_phone'].forEach((key) => {
      if (!phoneRegex.test(formData[key])) {
        newErrors[key] = 'Enter valid 10 digits number';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = document.querySelector(`input[name="${Object.keys(newErrors)[0]}"]`);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    // Store form data in local storage
    localStorage.setItem('formData', JSON.stringify(formData));
  };

  return (
    <div className="event2">
      <main>
        <h1 className="title">Upcoming Event: INNOVATION HACKATHON</h1>
        <p>Dates: September 26-28, 2024</p>
        <div className="image-container">
          <Image
            src="/sephackathon.jpg"
            alt="Event 2 Image"
            className="event-image"
            width={500} // specify width
            height={300} // specify height
          />
        </div>
        <div className="transparentBox">
          <Link href="/IRIS Hackathon GUIDELINES for participants.pdf">
            <a className="downloadLink me-2" download="IRIS Hackathon GUIDELINES.pdf">
              Innovation Hackathon GUIDELINES
            </a>
          </Link>
          <Link href="/IRIS-ppt-template-for-participants.pptx">
            <a className="downloadLink" download="InnovationHackathon_PPT_Template.pptx">
              Innovation Hackathon PPT Template
            </a>
          </Link>
        </div>
        <div className="checkout-box">
          <h2 className="title2">*Registration Fee: INR 250*</h2>
          <form onSubmit={handleSubmit}>
            <h5 className="warning">*If you don&apos;t have 4 members then repeat your details*</h5>
            <h3 className="centered-header">Team Information:</h3>
            {errors.team_name && <div className="error-text">{errors.team_name}</div>}
            <input
              type="text"
              name="team_name"
              value={formData.team_name}
              onChange={handleChange}
              placeholder="Team Name"
            />
            <h3 className="centered-header">Leader:</h3>
            {errors.leader_name && <div className="error-text">{errors.leader_name}</div>}
            <input
              type="text"
              name="leader_name"
              value={formData.leader_name}
              onChange={handleChange}
              placeholder="Leader Name"
            />
            {errors.leader_phone && <div className="error-text">{errors.leader_phone}</div>}
            <input
              type="tel"
              name="leader_phone"
              value={formData.leader_phone}
              onChange={handleChange}
              placeholder="Leader Phone Number"
            />
            {errors.leader_email && <div className="error-text">{errors.leader_email}</div>}
            <input
              type="email"
              name="leader_email"
              value={formData.leader_email}
              onChange={handleChange}
              placeholder="Leader Email ID"
            />
            {errors.leader_prn && <div className="error-text">{errors.leader_prn}</div>}
            <input
              type="text"
              name="leader_prn"
              value={formData.leader_prn}
              onChange={handleChange}
              placeholder="Leader PRN"
            />
            <input
              type="text"
              name="leader_branch"
              value={formData.leader_branch}
              onChange={handleChange}
              placeholder="Branch | Ex: SYCSE Core"
            />
            <button type="submit" className="submit-btn">Save & Proceed to Checkout</button>
          </form>
          <Link href="/checkoutPayment">
            <a className="btn btn-primary" onClick={() => localStorage.setItem('formData', JSON.stringify(formData))}>
              Proceed to Checkout
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Event2;
