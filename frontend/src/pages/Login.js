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
    toast.loading('Connecting to server... please wait.', {
      id: 'login-toast',
      duration: 60000
    });
    try {
      await login(form.username, form.password);
      toast.success('Welcome back!', { id: 'login-toast' });
      navigate('/dashboard');
    } catch {
      toast.error('Invalid username or password.', { id: 'login-toast' });
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
      <div style={{
        display: 'flex', borderRadius: 20, overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
      }}>

        {/* Left panel */}
        <div style={{
          width: 380, background: 'linear-gradient(160deg, #0ea5e9, #06b6d4, #10b981)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: 40, color: 'white'
        }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🏥</div>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10, textAlign: 'center' }}>
            HealthCare+
          </h2>
          <p style={{ textAlign: 'center', opacity: 0.85, lineHeight: 1.7, fontSize: 14 }}>
            Your health is our priority. Book appointments, consult doctors,
            and manage your health — all in one place.
          </p>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
            {[
              '📅 Easy appointment booking',
              '👨‍⚕️ Verified doctors',
              '🔒 Secure and private',
              '📱 Works on all devices'
            ].map(item => (
              <div key={item} style={{
                display: 'flex', alignItems: 'center',
                gap: 10, fontSize: 13, opacity: 0.9
              }}>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Server status message */}
          <div style={{
            marginTop: 32, background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 10, padding: '12px 16px',
            fontSize: 12, opacity: 0.9, textAlign: 'center', lineHeight: 1.6
          }}>
            First login may take up to 30 seconds while the server wakes up. Please be patient.
          </div>
        </div>

        {/* Right login form */}
        <div style={{ width: 400, background: 'white', padding: 48 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
            Welcome back
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 32 }}>
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{
                fontSize: 13, fontWeight: 500, color: '#374151',
                display: 'block', marginBottom: 6
              }}>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
                disabled={loading}
                style={{
                  width: '100%', padding: '11px 14px',
                  border: '1.5px solid #e2e8f0', borderRadius: 8,
                  fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  background: loading ? '#f8fafc' : 'white'
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                fontSize: 13, fontWeight: 500, color: '#374151',
                display: 'block', marginBottom: 6
              }}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                disabled={loading}
                style={{
                  width: '100%', padding: '11px 14px',
                  border: '1.5px solid #e2e8f0', borderRadius: 8,
                  fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  background: loading ? '#f8fafc' : 'white'
                }}
              />
            </div>

            {/* Loading progress bar — shows when logging in */}
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
                <p style={{
                  fontSize: 12, color: '#0284c7',
                  marginTop: 8, textAlign: 'center'
                }}>
                  Connecting to server... this may take a moment on first load.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px',
                background: loading
                  ? '#94a3b8'
                  : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                color: 'white', border: 'none', borderRadius: 8,
                fontSize: 15, fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
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
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#64748b' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: '#0ea5e9', fontWeight: 500, textDecoration: 'none'
            }}>
              Register here
            </Link>
          </p>

          {/* Server info note */}
          <div style={{
            marginTop: 24, padding: '12px 16px',
            background: '#fef3c7', borderRadius: 8,
            border: '1px solid #fde68a'
          }}>
            <p style={{ fontSize: 12, color: '#92400e', textAlign: 'center', lineHeight: 1.6 }}>
              If login takes too long, the server is waking up from sleep.
              Wait 30-60 seconds and try again.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}