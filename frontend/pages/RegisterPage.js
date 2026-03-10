import React, { useState } from 'react';

function FormInput({ label, name, type = 'text', value, onChange, required = false }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="form-control"
      />
    </div>
  );
}

function FileInput({ label, name, onChange, required = false }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={onChange}
        required={required}
        className="form-control file-control"
      />
    </div>
  );
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
  });
  const [idCardPhoto, setIdCardPhoto] = useState(null);
  const [selfiePhoto, setSelfiePhoto] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files.length) return;

    if (name === 'id_card_photo') {
      setIdCardPhoto(files[0]);
    } else if (name === 'selfie_photo') {
      setSelfiePhoto(files[0]);
    }
  };

  const isEmailValid = (email) => {
    // Simple email validation
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.address) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isEmailValid(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!idCardPhoto || !selfiePhoto) {
      setError('Please upload both ID card photo and selfie photo.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = new FormData();
      payload.append('first_name', formData.first_name);
      payload.append('last_name', formData.last_name);
      payload.append('email', formData.email);
      payload.append('password', formData.password);
      payload.append('address', formData.address);
      payload.append('id_card_photo', idCardPhoto);
      payload.append('selfie_photo', selfiePhoto);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      setSuccess('Your account is pending approval from Thailand Post staff.');
      setFormData({ first_name: '', last_name: '', email: '', password: '', address: '' });
      setIdCardPhoto(null);
      setSelfiePhoto(null);
      setError('');

      // reset file inputs if in form
      const idInput = document.getElementById('id_card_photo');
      const selfieInput = document.getElementById('selfie_photo');
      if (idInput) idInput.value = '';
      if (selfieInput) selfieInput.value = '';
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      setSuccess('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Create Account</h1>
        <p className="subtitle">Register for Thailand Post Online Label System</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="register-form" encType="multipart/form-data">
          <FormInput label="First Name" name="first_name" value={formData.first_name} onChange={handleInputChange} required />
          <FormInput label="Last Name"  name="last_name"  value={formData.last_name}  onChange={handleInputChange} required />
          <FormInput label="Email"      name="email"      type="email" value={formData.email}      onChange={handleInputChange} required />
          <FormInput label="Password"   name="password"   type="password" value={formData.password}   onChange={handleInputChange} required />
          <FormInput label="Address"    name="address"    type="text" value={formData.address}    onChange={handleInputChange} required />

          <FileInput label="National ID Card Photo" name="id_card_photo" onChange={handleFileChange} required />
          <FileInput label="Selfie Photo (holding ID)" name="selfie_photo" onChange={handleFileChange} required />

          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Register'}
          </button>
        </form>

        <p className="small-text">
          By registering, you agree to the terms and conditions of Thailand Post Online Label System.
        </p>
      </div>
    </div>
  );
}
