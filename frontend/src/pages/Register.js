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
    toast.loading('Creating your account... please wait.', {
      id: 'register-toast',
      duration: 60000
    });
    try {
      await API.post('/auth/register/', form);
      toast.success('Account created! Please login.', { id: 'register-toast' });
      navigate('/login');
    } catch (err) {
      const errors = err.response?.data;
      if (errors) {
        Object.values(errors).forEach(msg =>
          toast.error(Array.isArray(msg) ? msg[0] : msg, { id: 'register-toast' })
        );
      } else {
        toast.error('Registration failed. Try again.', { id: 'register-toast' });
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid #e2e8f0', borderRadius: 8,
    fontSize: 14, outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit',
    background: loading ? '#f8fafc' : 'white'
  };
  const labelStyle = {
    fontSize: 13, fontWeight: 500, color: '#374151',
    display: 'block', marginBottom: 6
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)', padding: 20
    }}>
      <div style={{
        background: 'white', borderRadius: 20, padding: 40,
        width: '100%', maxWidth: 560,
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48 }}>🏥</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
            Create Account
          </h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Join HealthCare+ today</p>
        </div>

        {/* Role selector */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {['patient', 'doctor'].map(role => (
            <button
              key={role}
              type="button"
              disabled={loading}
              onClick={() => setForm({ ...form, role })}
              style={{
                flex: 1, padding: '12px', borderRadius: 10,
                border: `2px solid ${form.role === role ? '#0ea5e9' : '#e2e8f0'}`,
                background: form.role === role ? '#e0f2fe' : 'white',
                color: form.role === role ? '#0284c7' : '#64748b',
                fontWeight: 600, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer',
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
              <input style={inputStyle} placeholder="John"
                value={form.first_name} disabled={loading}
                onChange={e => setForm({ ...form, first_name: e.target.value })} required />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input style={inputStyle} placeholder="Doe"
                value={form.last_name} disabled={loading}
                onChange={e => setForm({ ...form, last_name: e.target.value })} required />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Username</label>
            <input style={inputStyle} placeholder="johndoe"
              value={form.username} disabled={loading}
              onChange={e => setForm({ ...form, username: e.target.value })} required />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" placeholder="john@email.com"
              value={form.email} disabled={loading}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Phone Number</label>
            <input style={inputStyle} placeholder="+91 98765 43210"
              value={form.phone} disabled={loading}
              onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>

          {form.role === 'doctor' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Specialization</label>
                <select style={inputStyle} value={form.specialization} disabled={loading}
                  onChange={e => setForm({ ...form, specialization: e.target.value })}>
                  <option value="general">General Physician</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="neurology">Neurology</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="psychiatry">Psychiatry</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Years of Experience</label>
                <input style={inputStyle} type="number" min="0"
                  value={form.experience_years} disabled={loading}
                  onChange={e => setForm({ ...form, experience_years: parseInt(e.target.value) })} />
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Password</label>
              <input style={inputStyle} type="password" placeholder="••••••••"
                value={form.password} disabled={loading}
                onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input style={inputStyle} type="password" placeholder="••••••••"
                value={form.password2} disabled={loading}
                onChange={e => setForm({ ...form, password2: e.target.value })} required />
            </div>
          </div>

          {/* Loading progress bar */}
          {loading && (
            <div style={{ marginBottom: 16 }}>
              <div style={{
                background: '#e0f2fe', borderRadius: 4,
                height: 4, overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%', width: '40%',
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  borderRadius: 4,
                  animation: 'progress 1.5s ease-in-out infinite'
                }} />
              </div>
              <p style={{ fontSize: 12, color: '#0284c7', marginTop: 8, textAlign: 'center' }}>
                Creating your account... this may take a moment.
              </p>
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: 13,
            background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
            color: 'white', border: 'none', borderRadius: 8,
            fontSize: 15, fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}>
            {loading ? (
              <span style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 10
              }}>
                <span style={{
                  width: 16, height: 16,
                  border: '2px solid white',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  display: 'inline-block', flexShrink: 0
                }} />
                Creating Account...
              </span>
            ) : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: '#64748b' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#0ea5e9', fontWeight: 500, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>

        {/* Server info note */}
        <div style={{
          marginTop: 16, padding: '12px 16px',
          background: '#fef3c7', borderRadius: 8,
          border: '1px solid #fde68a'
        }}>
          <p style={{ fontSize: 12, color: '#92400e', textAlign: 'center', lineHeight: 1.6 }}>
            If registration takes too long, the server is waking up.
            Wait 30-60 seconds and try again.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}