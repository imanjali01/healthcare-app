import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch {
      toast.error('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)'
    }}>
      <div style={{ display: 'flex', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>

        {/* Left image panel */}
        <div style={{
          width: 380, background: 'linear-gradient(160deg, #0ea5e9, #06b6d4, #10b981)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: 40, color: 'white'
        }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🏥</div>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10, textAlign: 'center' }}>HealthCare+</h2>
          <p style={{ textAlign: 'center', opacity: 0.85, lineHeight: 1.7, fontSize: 14 }}>
            Your health is our priority. Book appointments, consult doctors, and manage your health — all in one place.
          </p>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
            {['📅 Easy appointment booking', '👨‍⚕️ Verified doctors', '🔒 Secure & private', '📱 Works on all devices'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, opacity: 0.9 }}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right login form */}
        <div style={{ width: 400, background: 'white', padding: 48 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Welcome back</h1>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 32 }}>Sign in to your account to continue</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
                style={{
                  width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0',
                  borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                style={{
                  width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0',
                  borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px', background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                color: 'white', border: 'none', borderRadius: 8, fontSize: 15,
                fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#64748b' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#0ea5e9', fontWeight: 500, textDecoration: 'none' }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}