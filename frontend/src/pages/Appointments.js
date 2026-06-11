import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Appointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchAppointments = () => {
    setLoading(true);
    API.get('/appointments/')
      .then(res => setAppointments(res.data))
      .catch(() => toast.error('Failed to load appointments'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.patch(`/appointments/${id}/status/`, { status });
      toast.success(`Appointment ${status}!`);
      fetchAppointments();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
        padding: '36px 40px', color: 'white'
      }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
          📋 {user?.role === 'doctor' ? 'Patient Appointments' : 'My Appointments'}
        </h1>
        <p style={{ opacity: 0.88, fontSize: 14 }}>
          {user?.role === 'doctor' ? 'Review and manage appointment requests' : 'Track all your appointment statuses'}
        </p>
      </div>

      <div style={{ padding: '28px 40px' }}>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {['all', 'pending', 'accepted', 'rejected', 'completed'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '7px 16px', borderRadius: 20, border: 'none',
              background: filter === s ? '#0ea5e9' : 'white',
              color: filter === s ? 'white' : '#64748b',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              textTransform: 'capitalize'
            }}>{s}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            <div style={{ fontSize: 40 }}>⏳</div>
            <p style={{ marginTop: 12 }}>Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            <div style={{ fontSize: 40 }}>📭</div>
            <p style={{ marginTop: 12 }}>No appointments found</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map(appt => (
              <div key={appt.id} style={{
                background: 'white', borderRadius: 14, padding: 20,
                boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 16, flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: 18, flexShrink: 0
                  }}>
                    {user?.role === 'patient' ? '👨‍⚕️' : '🧑‍💼'}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>
                      {user?.role === 'patient'
                        ? `Dr. ${appt.doctor_details?.first_name} ${appt.doctor_details?.last_name}`
                        : `${appt.patient_details?.first_name} ${appt.patient_details?.last_name}`}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>
                      📅 {appt.date} &nbsp;⏰ {appt.time?.slice(0, 5)}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                      📝 {appt.reason}
                    </div>
                    {appt.notes && (
                      <div style={{ fontSize: 12, color: '#10b981', marginTop: 2 }}>
                        💬 {appt.notes}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <StatusBadge status={appt.status} />
                  {user?.role === 'doctor' && appt.status === 'pending' && (
                    <>
                      <button onClick={() => handleStatusUpdate(appt.id, 'accepted')} style={{
                        padding: '7px 14px', background: '#10b981', color: 'white',
                        border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: 'pointer'
                      }}>Accept</button>
                      <button onClick={() => handleStatusUpdate(appt.id, 'rejected')} style={{
                        padding: '7px 14px', background: '#ef4444', color: 'white',
                        border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: 'pointer'
                      }}>Reject</button>
                    </>
                  )}
                  {user?.role === 'doctor' && appt.status === 'accepted' && (
                    <button onClick={() => handleStatusUpdate(appt.id, 'completed')} style={{
                      padding: '7px 14px', background: '#8b5cf6', color: 'white',
                      border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 500, cursor: 'pointer'
                    }}>Mark Complete</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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
      padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
      background: c.bg, color: c.color, textTransform: 'capitalize'
    }}>{status}</span>
  );
}