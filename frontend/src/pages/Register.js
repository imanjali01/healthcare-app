import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({
    username: '', email: '', password: '', password2: '',
    first_name: '', last_name: '', role: 'patient',
    phone: '', specialization: 'general', experience_years: 0
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      toast.error('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      await API.post('/auth/register/', form);
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      const errors = err.response?.data;
      if (errors) {
        Object.values(errors).forEach(msg => toast.error(Array.isArray(msg) ? msg[0] : msg));
      } else {
        toast.error('Registration failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0',
    borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit'
  };
  const labelStyle = {
    fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)', padding: 20
    }}>
      <div style={{
        background: 'white', borderRadius: 20, padding: 40,
        width: '100%', maxWidth: 560,
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48 }}>🏥</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Create Account</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Join HealthCare+ today</p>
        </div>

        {/* Role selector */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {['patient', 'doctor'].map(role => (
            <button
              key={role}
              type="button"
              onClick={() => setForm({ ...form, role })}
              style={{
                flex: 1, padding: '12px', borderRadius: 10,
                border: `2px solid ${form.role === role ? '#0ea5e9' : '#e2e8f0'}`,
                background: form.role === role ? '#e0f2fe' : 'white',
                color: form.role === role ? '#0284c7' : '#64748b',
                fontWeight: 600, fontSize: 14, cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {role === 'patient' ? '🧑‍💼 I am a Patient' : '👨‍⚕️ I am a Doctor'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input style={inputStyle} placeholder="John" value={form.first_name}
                onChange={e => setForm({ ...form, first_name: e.target.value })} required />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input style={inputStyle} placeholder="Doe" value={form.last_name}
                onChange={e => setForm({ ...form, last_name: e.target.value })} required />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Username</label>
            <input style={inputStyle} placeholder="johndoe" value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })} required />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" placeholder="john@email.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Phone Number</label>
            <input style={inputStyle} placeholder="+1 234 567 8900" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>

          {form.role === 'doctor' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Specialization</label>
                <select style={inputStyle} value={form.specialization}
                  onChange={e => setForm({ ...form, specialization: e.target.value })}>
                  <option value="general">General Physician</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="neurology">Neurology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="pediatrics">Pediatrics</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Years of Experience</label>
                <input style={inputStyle} type="number" min="0" value={form.experience_years}
                  onChange={e => setForm({ ...form, experience_years: parseInt(e.target.value) })} />
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>Password</label>
              <input style={inputStyle} type="password" placeholder="••••••••" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input style={inputStyle} type="password" placeholder="••••••••" value={form.password2}
                onChange={e => setForm({ ...form, password2: e.target.value })} required />
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: 13,
            background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
            color: 'white', border: 'none', borderRadius: 8,
            fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer'
          }}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#64748b' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#0ea5e9', fontWeight: 500, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}