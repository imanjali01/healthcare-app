import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API from '../utils/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/appointments/')
      .then(res => setAppointments(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const counts = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    accepted: appointments.filter(a => a.status === 'accepted').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  };

  const recentAppointments = appointments.slice(0, 5);

  const statCards = user?.role === 'patient' ? [
    { label: 'Total Appointments', value: counts.total, color: '#0ea5e9', emoji: '📅' },
    { label: 'Pending', value: counts.pending, color: '#f59e0b', emoji: '⏳' },
    { label: 'Accepted', value: counts.accepted, color: '#10b981', emoji: '✅' },
    { label: 'Completed', value: counts.completed, color: '#8b5cf6', emoji: '🏁' },
  ] : [
    { label: 'Total Requests', value: counts.total, color: '#0ea5e9', emoji: '📋' },
    { label: 'Pending Review', value: counts.pending, color: '#f59e0b', emoji: '⏳' },
    { label: 'Accepted', value: counts.accepted, color: '#10b981', emoji: '✅' },
    { label: 'Completed', value: counts.completed, color: '#8b5cf6', emoji: '🏁' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0ea5e9, #06b6d4, #10b981)',
        padding: '40px 40px 60px', color: 'white'
      }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>
          Good day, {user?.first_name || user?.username}! 👋
        </h1>
        <p style={{ opacity: 0.88, fontSize: 15 }}>
          {user?.role === 'doctor'
            ? 'Manage your appointments and help your patients.'
            : 'Welcome to your health dashboard. Stay on top of your appointments.'}
        </p>
      </div>

      <div style={{ padding: '0 40px', marginTop: -28 }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {statCards.map((s) => (
            <div key={s.label} style={{
              background: 'white', borderRadius: 14, padding: '20px 24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
              borderTop: `4px solid ${s.color}`
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: s.color }}>{loading ? '—' : s.value}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, paddingBottom: 40 }}>
          {/* Recent appointments */}
          <div style={{ background: 'white', borderRadius: 14, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 17, fontWeight: 600, color: '#0f172a' }}>Recent Appointments</h2>
              <Link to="/appointments" style={{ fontSize: 13, color: '#0ea5e9', textDecoration: 'none', fontWeight: 500 }}>
                View all →
              </Link>
            </div>
            {loading ? (
              <p style={{ color: '#94a3b8', fontSize: 14 }}>Loading...</p>
            ) : recentAppointments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#94a3b8' }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>📭</div>
                <p style={{ fontSize: 14 }}>No appointments yet</p>
                {user?.role === 'patient' && (
                  <Link to="/doctors" style={{
                    display: 'inline-block', marginTop: 12, padding: '8px 20px',
                    background: '#0ea5e9', color: 'white', borderRadius: 8,
                    textDecoration: 'none', fontSize: 13, fontWeight: 500
                  }}>Book your first appointment</Link>
                )}
              </div>
            ) : (
              recentAppointments.map(appt => (
                <div key={appt.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 0', borderBottom: '1px solid #f1f5f9'
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>
                      {user?.role === 'patient'
                        ? `Dr. ${appt.doctor_details?.first_name} ${appt.doctor_details?.last_name}`
                        : `${appt.patient_details?.first_name} ${appt.patient_details?.last_name}`}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                      {appt.date} at {appt.time?.slice(0, 5)}
                    </div>
                  </div>
                  <StatusBadge status={appt.status} />
                </div>
              ))
            )}
          </div>

          {/* Quick actions */}
          <div style={{ background: 'white', borderRadius: 14, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', marginBottom: 16 }}>Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {user?.role === 'patient' ? (
                <>
                  <ActionBtn to="/doctors" emoji="🔍" label="Find a Doctor" color="#0ea5e9" />
                  <ActionBtn to="/appointments" emoji="📋" label="View Appointments" color="#10b981" />
                </>
              ) : (
                <>
                  <ActionBtn to="/appointments" emoji="📋" label="View Appointments" color="#0ea5e9" />
                </>
              )}
            </div>

            {/* Health tip */}
            <div style={{
              marginTop: 24, padding: 16, background: '#f0fdf4',
              borderRadius: 10, border: '1px solid #bbf7d0'
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>💡</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#166534', marginBottom: 4 }}>Health Tip</div>
              <div style={{ fontSize: 12, color: '#15803d', lineHeight: 1.6 }}>
                Drink at least 8 glasses of water daily to stay hydrated and maintain good health.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    pending: { bg: '#fef3c7', color: '#92400e' },
    accepted: { bg: '#d1fae5', color: '#065f46' },
    rejected: { bg: '#fee2e2', color: '#991b1b' },
    completed: { bg: '#dbeafe', color: '#1e40af' },
  };
  const c = colors[status] || colors.pending;
  return (
    <span style={{
      padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 500,
      background: c.bg, color: c.color, textTransform: 'capitalize'
    }}>{status}</span>
  );
}

function ActionBtn({ to, emoji, label, color }) {
  return (
    <Link to={to} style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 16px', background: `${color}15`,
      borderRadius: 10, textDecoration: 'none',
      border: `1.5px solid ${color}30`, transition: 'all 0.2s'
    }}>
      <span style={{ fontSize: 18 }}>{emoji}</span>
      <span style={{ fontSize: 14, fontWeight: 500, color }}>{label}</span>
    </Link>
  );
}