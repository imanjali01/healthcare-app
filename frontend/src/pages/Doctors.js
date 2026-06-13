import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import toast from 'react-hot-toast';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get('/auth/doctors/');
      setDoctors(res.data);
    } catch {
      toast.error('Failed to load doctors. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDoctors(); }, [fetchDoctors]);

  const filtered = doctors.filter(d =>
    filter === '' || d.doctor_profile?.specialization === filter
  );

  const specializations = [
    ...new Set(doctors.map(d => d.doctor_profile?.specialization).filter(Boolean))
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
        padding: '36px 40px', color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
              👨‍⚕️ Find a Doctor
            </h1>
            <p style={{ opacity: 0.88, fontSize: 14 }}>
              Choose from our verified healthcare professionals
            </p>
          </div>
          <button
            onClick={fetchDoctors}
            disabled={loading}
            style={{
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.2)',
              border: '1.5px solid rgba(255,255,255,0.4)',
              color: 'white', borderRadius: 8,
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6
            }}
          >
            <span style={{
              display: 'inline-block',
              animation: loading ? 'spin 0.8s linear infinite' : 'none'
            }}>🔄</span>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div style={{ padding: '28px 40px' }}>

        {/* Filter bar */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          <FilterBtn label="All" active={filter === ''} onClick={() => setFilter('')} />
          {specializations.map(spec => (
            <FilterBtn
              key={spec}
              label={spec.charAt(0).toUpperCase() + spec.slice(1)}
              active={filter === spec}
              onClick={() => setFilter(spec)}
            />
          ))}
        </div>

        {loading ? (
          /* Skeleton loading cards */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20
          }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{
                background: 'white', borderRadius: 14,
                boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: 80, background: '#e2e8f0',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }} />
                <div style={{ padding: 20 }}>
                  <div style={{
                    height: 16, width: '60%', background: '#e2e8f0',
                    borderRadius: 4, marginBottom: 10,
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }} />
                  <div style={{
                    height: 12, width: '40%', background: '#e2e8f0',
                    borderRadius: 4, marginBottom: 16,
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }} />
                  <div style={{
                    height: 36, background: '#e2e8f0',
                    borderRadius: 8,
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            <div style={{ fontSize: 40 }}>🔍</div>
            <p style={{ marginTop: 12 }}>No doctors found</p>
            <button onClick={fetchDoctors} style={{
              marginTop: 16, padding: '8px 20px',
              background: '#0ea5e9', color: 'white',
              border: 'none', borderRadius: 8,
              fontSize: 13, fontWeight: 500, cursor: 'pointer'
            }}>Try Again</button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20
          }}>
            {filtered.map(doctor => (
              <div key={doctor.id} style={{
                background: 'white', borderRadius: 14,
                boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
                overflow: 'hidden', transition: 'transform 0.2s'
              }}>
                <div style={{
                  height: 80,
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)'
                }} />
                <div style={{ padding: '0 20px 20px', marginTop: -30 }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: 'white', border: '3px solid white',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 24,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: 10
                  }}>
                    {doctor.first_name?.[0] || '👨‍⚕️'}
                  </div>
                  <h3 style={{
                    fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 4
                  }}>
                    Dr. {doctor.first_name} {doctor.last_name}
                  </h3>
                  <p style={{
                    fontSize: 13, color: '#0ea5e9', fontWeight: 500,
                    marginBottom: 8, textTransform: 'capitalize'
                  }}>
                    {doctor.doctor_profile?.specialization?.replace('_', ' ') || 'General'}
                  </p>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                    <div style={{ fontSize: 12, color: '#64748b' }}>
                      🏆 {doctor.doctor_profile?.experience_years || 0} yrs exp
                    </div>
                    {doctor.doctor_profile?.consultation_fee > 0 && (
                      <div style={{ fontSize: 12, color: '#64748b' }}>
                        💰 ₹{doctor.doctor_profile?.consultation_fee}
                      </div>
                    )}
                  </div>
                  {doctor.doctor_profile?.bio && (
                    <p style={{
                      fontSize: 12, color: '#64748b',
                      lineHeight: 1.6, marginBottom: 16
                    }}>
                      {doctor.doctor_profile.bio.slice(0, 100)}
                      {doctor.doctor_profile.bio.length > 100 ? '...' : ''}
                    </p>
                  )}

                  {/* Availability badge */}
                  <div style={{ marginBottom: 12 }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 20, fontSize: 11,
                      fontWeight: 500,
                      background: doctor.doctor_profile?.is_available ? '#d1fae5' : '#fee2e2',
                      color: doctor.doctor_profile?.is_available ? '#065f46' : '#991b1b'
                    }}>
                      {doctor.doctor_profile?.is_available ? '✅ Available' : '❌ Unavailable'}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/book/${doctor.id}`)}
                    disabled={!doctor.doctor_profile?.is_available}
                    style={{
                      width: '100%', padding: '10px',
                      background: doctor.doctor_profile?.is_available
                        ? 'linear-gradient(135deg, #0ea5e9, #06b6d4)'
                        : '#94a3b8',
                      color: 'white', border: 'none', borderRadius: 8,
                      fontSize: 13, fontWeight: 600,
                      cursor: doctor.doctor_profile?.is_available ? 'pointer' : 'not-allowed'
                    }}
                  >
                    {doctor.doctor_profile?.is_available
                      ? '📅 Book Appointment'
                      : 'Not Available'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function FilterBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '7px 16px', borderRadius: 20,
      border: `1.5px solid ${active ? '#0ea5e9' : '#e2e8f0'}`,
      background: active ? '#0ea5e9' : 'white',
      color: active ? 'white' : '#64748b',
      fontSize: 13, fontWeight: 500, cursor: 'pointer'
    }}>{label}</button>
  );
}