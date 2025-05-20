// File: components/LeadForm.jsx
import React from "react";
import "../styles/lead-form.css";

const LeadForm = ({
  name,
  email,
  phone,
  message,
  loading,
  onChangeName,
  onChangeEmail,
  onChangePhone,
  onChangeMessage,
  onSubmit,
}) => (
  <div className="popup-panel">
    <div className="popup-text">
      <h2>Let's Get Started!</h2>
      <p>Tell us a little about you and we'll build your dream site for FREE.</p>
      <form className="lead-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="*Your Name"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          required
          autoComplete="name"
        />
        <input
          type="email"
          placeholder="*Your Email"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="tel"
          placeholder="*Your Phone Number (e.g. +1234567890)"
          value={phone}
          onChange={(e) => onChangePhone(e.target.value)}
          required
          pattern="^\+\d{10,15}$"
          title="Please enter a valid phone number with country code (e.g. +1234567890)"
          autoComplete="tel"
        />
        <textarea
          placeholder="Your Message (optional)"
          value={message}
          onChange={(e) => onChangeMessage(e.target.value)}
          rows={3}
        />
        {loading ? (
          <div className="spinner" aria-label="Loading"></div>
        ) : (
          <button type="submit">SUBMIT</button>
        )}
      </form>
    </div>
  </div>
);

export default LeadForm;
