import { useState } from 'react';
import { registerUser } from '../services/authService';
import NavigationButtons from '../components/NavigationButtons';

function FileUpload({ label, name, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label} <span className="required">*</span>
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        className="form-file"
        onChange={onChange}
      />
    </div>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
  });
  const [idCardPhoto, setIdCardPhoto] = useState(null);
  const [selfiePhoto, setSelfiePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files?.[0] || null;
    if (name === 'id_card_photo') setIdCardPhoto(file);
    if (name === 'selfie_photo') setSelfiePhoto(file);
  };

  const isEmailValid = (value) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return regex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.first_name || !form.last_name || !form.email || !form.password || !form.address) {
      setError('All fields are required.');
      return;
    }

    if (!isEmailValid(form.email)) {
      setError('Email is invalid.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!idCardPhoto || !selfiePhoto) {
      setError('Please upload both ID card photo and selfie photo.');
      return;
    }

    const data = new FormData();
    data.append('first_name', form.first_name);
    data.append('last_name', form.last_name);
    data.append('email', form.email);
    data.append('password', form.password);
    data.append('address', form.address);
    data.append('id_card_photo', idCardPhoto);
    data.append('selfie_photo', selfiePhoto);

    try {
      setLoading(true);
      await registerUser(data);
      setSuccess('Your account is pending approval from Thailand Post staff.');
      setForm({ first_name: '', last_name: '', email: '', password: '', address: '' });
      setIdCardPhoto(null);
      setSelfiePhoto(null);
      document.getElementById('id_card_photo').value = '';
      document.getElementById('selfie_photo').value = '';
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: '1rem' }}>
      <NavigationButtons
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Create Shipment', path: '/shipment/create' },
          { label: 'Register' },
        ]}
      />
      <h1 className="title">Create Account</h1>
      <p className="subtitle">Thailand Post Online Label System</p>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="responsive-grid">
          <div className="form-group">
            <label htmlFor="first_name" className="form-label">
              First Name <span className="required">*</span>
            </label>
            <input
              id="first_name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name" className="form-label">
              Last Name <span className="required">*</span>
            </label>
            <input
              id="last_name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email <span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password <span className="required">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">
            Address <span className="required">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="form-textarea"
            rows={3}
            required
          />
        </div>

        <FileUpload label="National ID Card Photo" name="id_card_photo" onChange={handleFileChange} />
        <FileUpload label="Selfie Photo holding ID card" name="selfie_photo" onChange={handleFileChange} />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
