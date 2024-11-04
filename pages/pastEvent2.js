import React, { useState } from 'react';
import './event2.css';
import Link from 'next/link';

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
          <img src="/sephackathon.jpg" alt="Event 2 Image" className="event-image" />
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
            <h5 className="warning">*If you don't have 4 members then repeat your details*</h5>
            <h3 className="centered-header">Team Information:</h3>
            {errors.team_name && <div className="error-text">{errors.team_name}</div>}
            <input
              type="text"
              name="team_name"
              value={formData.team_name}
              onChange={handleChange}
              placeholder="Team Name"
            />
            {/* Leader Section */}
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
            {/* Members Section */}
            {/* Repeat similar code blocks for Member 2, Member 3, and Member 4 */}
            <h3 className="centered-header">Member 2:</h3>
            {errors.member2_name && <div className="error-text">{errors.member2_name}</div>}
            <input
              type="text"
              name="member2_name"
              value={formData.member2_name}
              onChange={handleChange}
              placeholder="Name"
            />
            {errors.member2_phone && <div className="error-text">{errors.member2_phone}</div>}
            <input
              type="tel"
              name="member2_phone"
              value={formData.member2_phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            {errors.member2_email && <div className="error-text">{errors.member2_email}</div>}
            <input
              type="email"
              name="member2_email"
              value={formData.member2_email}
              onChange={handleChange}
              placeholder="Email ID"
            />
            {errors.member2_prn && <div className="error-text">{errors.member2_prn}</div>}
            <input
              type="text"
              name="member2_prn"
              value={formData.member2_prn}
              onChange={handleChange}
              placeholder="PRN"
            />
            <input
              type="text"
              name="member2_branch"
              value={formData.member2_branch}
              onChange={handleChange}
              placeholder="Branch | Ex: SYCSE Core"
            />
            {/* Repeat for Member 3 and Member 4 */}
            <h3 className="centered-header">Member 3:</h3>
            {errors.member3_name && <div className="error-text">{errors.member3_name}</div>}
            <input
              type="text"
              name="member3_name"
              value={formData.member3_name}
              onChange={handleChange}
              placeholder="Name"
            />
            {errors.member3_phone && <div className="error-text">{errors.member3_phone}</div>}
            <input
              type="tel"
              name="member3_phone"
              value={formData.member3_phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            {errors.member3_email && <div className="error-text">{errors.member3_email}</div>}
            <input
              type="email"
              name="member3_email"
              value={formData.member3_email}
              onChange={handleChange}
              placeholder="Email ID"
            />
            {errors.member3_prn && <div className="error-text">{errors.member3_prn}</div>}
            <input
              type="text"
              name="member3_prn"
              value={formData.member3_prn}
              onChange={handleChange}
              placeholder="PRN"
            />
            <input
              type="text"
              name="member3_branch"
              value={formData.member3_branch}
              onChange={handleChange}
              placeholder="Branch | Ex: SYCSE Core"
            />
            <h3 className="centered-header">Member 4:</h3>
            {errors.member4_name && <div className="error-text">{errors.member4_name}</div>}
            <input
              type="text"
              name="member4_name"
              value={formData.member4_name}
              onChange={handleChange}
              placeholder="Name"
            />
            {errors.member4_phone && <div className="error-text">{errors.member4_phone}</div>}
            <input
              type="tel"
              name="member4_phone"
              value={formData.member4_phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            {errors.member4_email && <div className="error-text">{errors.member4_email}</div>}
            <input
              type="email"
              name="member4_email"
              value={formData.member4_email}
              onChange={handleChange}
              placeholder="Email ID"
            />
            {errors.member4_prn && <div className="error-text">{errors.member4_prn}</div>}
            <input
              type="text"
              name="member4_prn"
              value={formData.member4_prn}
              onChange={handleChange}
              placeholder="PRN"
            />
            <input
              type="text"
              name="member4_branch"
              value={formData.member4_branch}
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
