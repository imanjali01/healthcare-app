import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/auth/doctors/')
      .then(res => setDoctors(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = doctors.filter(d =>
    filter === '' || d.doctor_profile?.specialization === filter
  );

  const specializations = [...new Set(doctors.map(d => d.doctor_profile?.specialization).filter(Boolean))];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
        padding: '36px 40px', color: 'white'
      }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>👨‍⚕️ Find a Doctor</h1>
        <p style={{ opacity: 0.88, fontSize: 14 }}>Choose from our verified healthcare professionals</p>
      </div>

      <div style={{ padding: '28px 40px' }}>
        {/* Filter bar */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          <FilterBtn label="All" active={filter === ''} onClick={() => setFilter('')} />
          {specializations.map(spec => (
            <FilterBtn key={spec} label={spec.charAt(0).toUpperCase() + spec.slice(1)}
              active={filter === spec} onClick={() => setFilter(spec)} />
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            <div style={{ fontSize: 40 }}>⏳</div>
            <p style={{ marginTop: 12 }}>Loading doctors...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            <div style={{ fontSize: 40 }}>🔍</div>
            <p style={{ marginTop: 12 }}>No doctors found</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {filtered.map(doctor => (
              <div key={doctor.id} style={{
                background: 'white', borderRadius: 14,
                boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
                overflow: 'hidden', transition: 'transform 0.2s'
              }}>
                {/* Card top color strip */}
                <div style={{
                  height: 80, background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  display: 'flex', alignItems: 'flex-end', padding: '0 20px 0'
                }} />
                <div style={{ padding: '0 20px 20px', marginTop: -30 }}>
                  {/* Avatar */}
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: 'white', border: '3px solid white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    marginBottom: 10
                  }}>
                    {doctor.first_name?.[0] || '👨‍⚕️'}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>
                    Dr. {doctor.first_name} {doctor.last_name}
                  </h3>
                  <p style={{ fontSize: 13, color: '#0ea5e9', fontWeight: 500, marginBottom: 8, textTransform: 'capitalize' }}>
                    {doctor.doctor_profile?.specialization?.replace('_', ' ') || 'General'}
                  </p>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                    <div style={{ fontSize: 12, color: '#64748b' }}>
                      🏆 {doctor.doctor_profile?.experience_years || 0} yrs exp
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>
                      📞 {doctor.phone || 'N/A'}
                    </div>
                  </div>
                  {doctor.doctor_profile?.bio && (
                    <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>
                      {doctor.doctor_profile.bio.slice(0, 100)}{doctor.doctor_profile.bio.length > 100 ? '...' : ''}
                    </p>
                  )}
                  <button
                    onClick={() => navigate(`/book/${doctor.id}`)}
                    style={{
                      width: '100%', padding: '10px', background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                      color: 'white', border: 'none', borderRadius: 8,
                      fontSize: 13, fontWeight: 600, cursor: 'pointer'
                    }}
                  >
                    📅 Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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