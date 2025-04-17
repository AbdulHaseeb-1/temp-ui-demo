import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    province: '',
    address: '',
    select: '',
    message: ''
  });

  const provinces = [
    'Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan',
    'Islamabad Capital Territory', 'Azad Jammu & Kashmir', 'Gilgit-Baltistan'
  ];

  const contactOptions = [
    '0311-1234567',
    '0322-2345678',
    '0333-3456789'
  ];

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user-questions/add', formData);
      alert('Your question was submitted!');
      setFormData({
        name: '', email: '', contact: '',
        province: '', address: '', select: '', message: ''
      });
    } catch (err) {
      alert('Error submitting question');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />

        <label>Province:</label>
        <select name="province" value={formData.province} onChange={handleChange} required>
          <option value="">Select Province</option>
          {provinces.map((prov, idx) => (
            <option key={idx} value={prov}>{prov}</option>
          ))}
        </select>

        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />

        <label>Select Contact Number:</label>
        <select name="select" value={formData.select} onChange={handleChange} required>
          <option value="">Choose Contact Number</option>
          {contactOptions.map((num, idx) => (
            <option key={idx} value={num}>{num}</option>
          ))}
        </select>

        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
