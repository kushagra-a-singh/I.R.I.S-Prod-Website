import React, { useState, useRef } from "react";
import supabase from '../../src/utils/supabase';
import styles from "./recruitment.module.css";
import Select from "react-select";

function Recruitment() {
  const [link, setLink] = useState("/bgVid.webm")
  const [formData, setFormData] = useState({
    name: "",
    prn: "",
    interests: "",
    domain: [],
    email: "",
    phone: "",
    file: null,
    school: "",
    branch: "",
    currentYear: "",
    experience: "",
    contribution: ""
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    prn: "",
    email: "",
    phone: "",
    school: "",
    branch: "",
    currentYear: "",
    domain: "",
    file: "",
    interests: "",
    experience: "",
    contribution: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const fileInputRef = useRef(null);

  const schoolsList = [
    "WPU School of Economics and Commerce",
    "Ramcharan School of Leadership",
    "WPU School of Business",
    "Faculty of Governance",
    "WPU School of Engineering and Technology",
    "WPU School of Consciousness",
    "WPU School of Law",
    "Department of Liberal Arts",
    "Department of Biosciences and Technology",
    "Department of Pharmaceutical Science",
    "Department of Visual Arts",
    "Department of Design",
    "WPU School of Photography",
    "WPU School of Computer Science and Engineering",
    "WPU School of Science & Environmental Studies",
    "Others"
  ];
  const uniqueSchools = [...new Set(schoolsList)];
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validatePrn = (prn) => /^[0-9]{10}$/.test(prn);
  const validateEmail = (email) => /^(.*@gmail\.com|.*@mitwpu\.edu\.in)$/.test(email);

  const domainOptions = [
    {
      label: 'Tech',
      options: [
        { value: 'Tarzan', label: 'TARZAN - Autonomous Vehicle Project' },
        { value: 'Website', label: 'I.R.I.S. Website - Development & Updates' }
      ]
    },
    {
      label: 'Non-tech',
      options: [
        { value: 'content-writing', label: 'Content Writing (Blogs, Research Papers)' },
        { value: 'content-creation', label: 'Content Creation (Video Creation, Video Hosting)' },
        { value: 'video-editor', label: 'Video Editor' },
        { value: 'graphic-designer', label: 'Graphic Designer' },
        { value: '3d-modelling-artist', label: '3D Modelling Artist/Animator' },
        { value: 'event-ops', label: 'Event and Ops (Event Management)' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sponsorship-outreach', label: 'Sponsorship and Outreach' }
      ]
    }
  ];

  const customSingleValue = ({ data }) => (
    <div className="custom-single-value">
      {data.label}
    </div>
  );

  const customStyles = {
    groupHeading: (provided) => ({
      ...provided,
      fontWeight: 'bold',
      fontSize: '16px',
      color: '#333',
    }),
    option: (provided) => ({
      ...provided,
      fontWeight: 'normal',
      fontSize: '14px',
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      const file = e.target.files[0];
      if (file && file.size > 200 * 1024) {
        setFormErrors({ ...formErrors, file: "File size should not exceed 200 kB" });
        return;
      } else {
        setFormErrors({ ...formErrors, file: "" });
      }
      setFormData({ ...formData, file });
    } else {
      setFormData({ ...formData, [name]: value });
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleDomainChange = (selectedOptions) => {
    const selectedDomainValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData(prevData => ({
      ...prevData,
      domain: selectedDomainValues
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    const newErrors = {};
    let formIsValid = true;

    // Only validate required fields (removed interests, experience, contribution from required validation)
    const requiredFields = ['name', 'prn', 'email', 'phone', 'branch', 'currentYear'];
    
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        formIsValid = false;
      }
    });

    if (!formData.domain || formData.domain.length === 0) {
      newErrors.domain = "Please select at least one domain.";
      formIsValid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid Phone number.";
      formIsValid = false;
    }

    if (!validatePrn(formData.prn)) {
      newErrors.prn = "Please enter a valid PRN.";
      formIsValid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      formIsValid = false;
    }

    if (formData.file && !formData.file.name.endsWith(".pdf")) {
      newErrors.file = "Please upload a valid PDF resume.";
      formIsValid = false;
    }

    setFormErrors(newErrors);

    if (!formIsValid) {
      const firstErrorField = Object.keys(newErrors)[0];
      const firstErrorElement = document.getElementById(firstErrorField);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Set submitting state to true to show loading
    setIsSubmitting(true);

    try {
      // File upload
      const fileUrl = formData.file ? await uploadFile(formData.file) : null;
      
      // Format domain names for email readability
      const domainLabels = formData.domain.map(value => {
        const option = domainOptions
          .flatMap(group => group.options)
          .find(option => option.value === value);
        return option ? option.label : value;
      });

      // Handle database insertion and email sending in parallel
      const databasePromise = supabase
        .from('recruitment_forms')
        .insert([{
          name: formData.name,
          prn: formData.prn,
          email: formData.email,
          phone: formData.phone,
          domain: formData.domain,
          interests: formData.interests,
          experience: formData.experience,
          contribution: formData.contribution,
          cv_url: fileUrl,
          school: formData.school,
          branch: formData.branch,
          current_year: formData.currentYear,
          created_at: new Date().toISOString()
        }]);

      const emailPromise = fetch('/api/recruitment-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          prn: formData.prn,
          email: formData.email,
          phone: formData.phone,
          domain: domainLabels,
          interests: formData.interests,
          experience: formData.experience,
          contribution: formData.contribution,
          cv_url: fileUrl,
          school: formData.school,
          branch: formData.branch,
          currentYear: formData.currentYear,
          created_at: new Date().toISOString()
        }),
      });

      // Wait for both operations to complete
      const [dbResult, emailResult] = await Promise.all([databasePromise, emailPromise]);
      
      if (dbResult.error) {
        throw new Error(`Database error: ${dbResult.error.message}`);
      }

      const emailResponse = await emailResult.json();
      if (!emailResponse.success) {
        throw new Error(`Email error: ${emailResponse.error || 'Failed to send emails'}`);
      }

      // Show success notification
      setShowNotification(true);
      
      // Reset form
      setFormData({
        name: "",
        prn: "",
        interests: "",
        domain: [],
        email: "",
        phone: "",
        file: null,
        contribution: "",
        experience: "",
        school: "",
        branch: "",
        currentYear: ""
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormErrors({ 
        ...formErrors, 
        form: `Error submitting form: ${error.message || 'An unknown error occurred'}` 
      });
      
      // Show error to user
      alert(`Failed to submit your application. ${error.message || 'Please try again later.'}`);
    } finally {
      // Reset submitting state
      setIsSubmitting(false);
    }
  };

  const uploadFile = async (file) => {
    const filePath = `cvs/${formData.name}-${Date.now()}.pdf`;
    const { data, error: uploadError } = await supabase
      .storage
      .from('cv_bucket')
      .upload(filePath, file);

    if (uploadError) {
      setFormErrors({ ...formErrors, file: "Error uploading file: " + uploadError.message });
      return null;
    }

    const { data: { publicUrl } } = supabase
      .storage
      .from('cv_bucket')
      .getPublicUrl(filePath);
      
    return publicUrl;
  };

  const handleOkayButton = () => {
    setShowNotification(false);
  };

  return (
    <div className={styles.contact}>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop>
          <source src={link} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Club Recruitment Form</h1>
        <p className={styles.titleDesc}>
          Fill out the below recruitment form to join I.R.I.S.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Form fields remain unchanged */}
          <div className={styles.formGroup}>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && <p className="text-danger">{formErrors.name}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="prn">PRN*</label>
            <input
              type="text"
              id="prn"
              name="prn"
              value={formData.prn}
              onChange={handleChange}
            />
            {formErrors.prn && <p className="text-danger">{formErrors.prn}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {formErrors.phone && <p className="text-danger">{formErrors.phone}</p>}
          </div>
          {/* Commented out School dropdown as requested */}
          {/* <div className={styles.formGroup}>
            <label htmlFor="school">School*</label>
            <select
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="form-control"
            >
              <option value="" disabled>Choose a school</option>
              {uniqueSchools.map((school, index) => (
                <option key={index} value={school}>{school}</option>
              ))}
            </select>
            {formErrors.school && <p className="text-danger">{formErrors.school}</p>}
          </div> */}
          <div className={styles.formGroup}>
            <label htmlFor="branch">Branch*</label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="form-control"
            />
            {formErrors.branch && <p className="text-danger">{formErrors.branch}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="currentYear">Current Year*</label>
            <select
              id="currentYear"
              name="currentYear"
              value={formData.currentYear}
              onChange={handleChange}
              className="form-control"
            >
              <option value="" disabled>Choose your year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            {formErrors.currentYear && <p className="text-danger">{formErrors.currentYear}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="domain">Select Domain(s)*</label>
            <Select
              id="domain"
              name="domain"
              options={domainOptions}
              isMulti
              value={formData.domain.map(value => ({
                value,
                label: domainOptions
                  .flatMap(group => group.options)
                  .find(option => option.value === value)?.label
              }))}
              onChange={handleDomainChange}
              components={{ SingleValue: customSingleValue }}
              className="react-select-container"
              classNamePrefix="react-select"
              styles={customStyles}
            />
            {formErrors.domain && <p className="text-danger">{formErrors.domain}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="file">Resume or CV (OPTIONAL)</label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf"
              onChange={handleChange}
              ref={fileInputRef}
            />
            {formErrors.file && <p className="text-danger">{formErrors.file}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="interests">What are your area of interests? (optional)</label>
            <textarea
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
            />
            {formErrors.interests && <p className="text-danger">{formErrors.interests}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="experience">Any past experiences in your area of interest? (optional)</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
            {formErrors.experience && <p className="text-danger">{formErrors.experience}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contribution">Why do you want to join IRIS and how will you be able to contribute? (optional)</label>
            <textarea
              id="contribution"
              name="contribution"
              value={formData.contribution}
              onChange={handleChange}
            />
            {formErrors.contribution && <p className="text-danger">{formErrors.contribution}</p>}
          </div>
          <div className={styles.formGroup}>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          {formErrors.form && <p className="text-danger">{formErrors.form}</p>}
        </form>
      </div>
      {showNotification && (
        <div className={styles.notificationPopup}>
          <div className={styles.notificationContent}>
            <h2>Thank you for registering!</h2>
            <p>Your form has been successfully submitted.</p>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>Join our WhatsApp groups:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a 
                  href="https://chat.whatsapp.com/CC5ranLYztZBZnWxSPi8Mg?mode=ems_share_t" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#25D366',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    display: 'inline-block',
                    width: 'fit-content',
                    margin: '0 auto'
                  }}
                >
                  📱 IRIS Recruits
                </a>
                <a 
                  href="https://chat.whatsapp.com/B6PsaI5iGP9H4asHCMmX9f?mode=ac_t" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#25D366',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    display: 'inline-block',
                    width: 'fit-content',
                    margin: '0 auto'
                  }}
                >
                  💬 IRIS Community
                </a>
              </div>
            </div>
            <button onClick={handleOkayButton} style={{ marginTop: '20px' }}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recruitment;
