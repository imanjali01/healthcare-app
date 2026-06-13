import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import toast from 'react-hot-toast';

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [form, setForm] = useState({
    doctor: doctorId, date: '', time: '', reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchingDoctor, setFetchingDoctor] = useState(true);

  useEffect(() => {
    setFetchingDoctor(true);
    API.get('/auth/doctors/')
      .then(res => {
        const found = res.data.find(d => d.id === parseInt(doctorId));
        setDoctor(found);
      })
      .catch(() => toast.error('Failed to load doctor info.'))
      .finally(() => setFetchingDoctor(false));
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading('Booking your appointment...', {
      id: 'book-toast', duration: 30000
    });
    try {
      await API.post('/appointments/', form);
      toast.success(
        'Appointment booked! Waiting for doctor confirmation.',
        { id: 'book-toast' }
      );
      navigate('/appointments');
    } catch {
      toast.error('Failed to book appointment. Try again.', { id: 'book-toast' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid #e2e8f0', borderRadius: 8,
    fontSize: 14, outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit',
    background: loading ? '#f8fafc' : 'white'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
        padding: '36px 40px', color: 'white'
      }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
          📅 Book Appointment
        </h1>
        <p style={{ opacity: 0.88, fontSize: 14 }}>
          Fill in the details to request an appointment
        </p>
      </div>

      <div style={{ padding: '32px 40px', maxWidth: 600 }}>

        {/* Doctor info card */}
        {fetchingDoctor ? (
          <div style={{
            background: 'white', borderRadius: 14, padding: 20,
            boxShadow: '0 4px 12px rgba(0,0,0,0.07)', marginBottom: 24
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#e2e8f0', flexShrink: 0,
                animation: 'pulse 1.5s ease-in-out infinite'
              }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  height: 16, width: '50%', background: '#e2e8f0',
                  borderRadius: 4, marginBottom: 8,
                  animation: 'pulse 1.5s ease-in-out infinite'
                }} />
                <div style={{
                  height: 12, width: '35%', background: '#e2e8f0',
                  borderRadius: 4, animation: 'pulse 1.5s ease-in-out infinite'
                }} />
              </div>
            </div>
          </div>
        ) : doctor && (
          <div style={{
            background: 'white', borderRadius: 14, padding: 20,
            boxShadow: '0 4px 12px rgba(0,0,0,0.07)', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 16
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 22, flexShrink: 0
            }}>
              {doctor.first_name?.[0] || '👨‍⚕️'}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>
                Dr. {doctor.first_name} {doctor.last_name}
              </div>
              <div style={{
                fontSize: 13, color: '#0ea5e9',
                textTransform: 'capitalize', marginTop: 2
              }}>
                {doctor.doctor_profile?.specialization}
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                {doctor.doctor_profile?.experience_years} years experience
              </div>
            </div>
          </div>
        )}

        {/* Booking form */}
        <div style={{
          background: 'white', borderRadius: 14, padding: 28,
          boxShadow: '0 4px 12px rgba(0,0,0,0.07)'
        }}>
          <h2 style={{
            fontSize: 17, fontWeight: 600, color: '#0f172a', marginBottom: 20
          }}>
            Appointment Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 16, marginBottom: 16
            }}>
              <div>
                <label style={{
                  fontSize: 13, fontWeight: 500, color: '#374151',
                  display: 'block', marginBottom: 6
                }}>Date</label>
                <input
                  type="date" style={inputStyle}
                  value={form.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  disabled={loading} required
                />
              </div>
              <div>
                <label style={{
                  fontSize: 13, fontWeight: 500, color: '#374151',
                  display: 'block', marginBottom: 6
                }}>Time</label>
                <input
                  type="time" style={inputStyle}
                  value={form.time}
                  onChange={e => setForm({ ...form, time: e.target.value })}
                  disabled={loading} required
                />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{
                fontSize: 13, fontWeight: 500, color: '#374151',
                display: 'block', marginBottom: 6
              }}>Reason for Visit</label>
              <textarea
                style={{ ...inputStyle, height: 100, resize: 'vertical' }}
                placeholder="Describe your symptoms or reason for the appointment..."
                value={form.reason}
                onChange={e => setForm({ ...form, reason: e.target.value })}
                disabled={loading} required
              />
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
                <p style={{
                  fontSize: 12, color: '#0284c7',
                  marginTop: 8, textAlign: 'center'
                }}>
                  Booking your appointment...
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={loading}
                style={{
                  flex: 1, padding: 12, background: 'white',
                  border: '1.5px solid #e2e8f0', borderRadius: 8,
                  fontSize: 14, fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  color: '#64748b'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 2, padding: 12,
                  background: loading
                    ? '#94a3b8'
                    : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  color: 'white', border: 'none', borderRadius: 8,
                  fontSize: 14, fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8
                }}
              >
                {loading ? (
                  <>
                    <span style={{
                      width: 16, height: 16,
                      border: '2px solid white',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                      display: 'inline-block', flexShrink: 0
                    }} />
                    Booking...
                  </>
                ) : '📅 Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
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