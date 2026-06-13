import React, { useEffect, useState, useCallback } from 'react';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Appointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAppointments = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await API.get('/appointments/');
      setAppointments(res.data);
      setLastUpdated(new Date());
    } catch {
      if (!silent) toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();

    // Auto refresh every 15 seconds silently
    const interval = setInterval(() => {
      fetchAppointments(true);
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchAppointments]);

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      await API.patch(`/appointments/${id}/status/`, { status });
      toast.success(`Appointment ${status} successfully!`);
      await fetchAppointments(true);
    } catch {
      toast.error('Failed to update status. Try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleManualRefresh = () => {
    fetchAppointments(true);
    toast.success('Appointments refreshed!', { duration: 1500 });
  };

  const filtered = filter === 'all'
    ? appointments
    : appointments.filter(a => a.status === filter);

  const counts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    accepted: appointments.filter(a => a.status === 'accepted').length,
    rejected: appointments.filter(a => a.status === 'rejected').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  };

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
              📋 {user?.role === 'doctor' ? 'Patient Appointments' : 'My Appointments'}
            </h1>
            <p style={{ opacity: 0.88, fontSize: 14 }}>
              {user?.role === 'doctor'
                ? 'Review and manage appointment requests'
                : 'Track all your appointment statuses'}
            </p>
            {lastUpdated && (
              <p style={{ opacity: 0.7, fontSize: 12, marginTop: 6 }}>
                Last updated: {lastUpdated.toLocaleTimeString()} · Auto-refreshes every 15 seconds
              </p>
            )}
          </div>

          {/* Manual refresh button */}
          <button
            onClick={handleManualRefresh}
            disabled={refreshing}
            style={{
              padding: '9px 18px',
              background: 'rgba(255,255,255,0.2)',
              border: '1.5px solid rgba(255,255,255,0.4)',
              color: 'white', borderRadius: 8,
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              opacity: refreshing ? 0.7 : 1
            }}
          >
            <span style={{
              display: 'inline-block',
              animation: refreshing ? 'spin 0.8s linear infinite' : 'none'
            }}>🔄</span>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div style={{ padding: '28px 40px' }}>

        {/* Filter tabs with counts */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {['all', 'pending', 'accepted', 'rejected', 'completed'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '7px 16px', borderRadius: 20, border: 'none',
              background: filter === s ? '#0ea5e9' : 'white',
              color: filter === s ? 'white' : '#64748b',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              textTransform: 'capitalize',
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              {s}
              <span style={{
                background: filter === s ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                color: filter === s ? 'white' : '#64748b',
                padding: '1px 7px', borderRadius: 10, fontSize: 11
              }}>
                {counts[s]}
              </span>
            </button>
          ))}
        </div>

        {/* Refreshing indicator */}
        {refreshing && (
          <div style={{
            textAlign: 'center', padding: '8px', marginBottom: 16,
            background: '#e0f2fe', borderRadius: 8,
            fontSize: 13, color: '#0284c7'
          }}>
            Checking for updates...
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            <div style={{
              width: 40, height: 40, margin: '0 auto 16px',
              border: '3px solid #e2e8f0',
              borderTop: '3px solid #0ea5e9',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
            <p style={{ marginTop: 12, fontSize: 14 }}>Loading appointments...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            <div style={{ fontSize: 40 }}>📭</div>
            <p style={{ marginTop: 12 }}>No {filter === 'all' ? '' : filter} appointments found</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map(appt => (
              <div key={appt.id} style={{
                background: 'white', borderRadius: 14, padding: 20,
                boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16, flexWrap: 'wrap',
                opacity: updatingId === appt.id ? 0.6 : 1,
                transition: 'opacity 0.2s'
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
                      📅 {appt.date} &nbsp; ⏰ {appt.time?.slice(0, 5)}
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

                {/* Status and action buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <StatusBadge status={appt.status} />

                  {updatingId === appt.id ? (
                    <span style={{ fontSize: 12, color: '#64748b' }}>Updating...</span>
                  ) : (
                    <>
                      {user?.role === 'doctor' && appt.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(appt.id, 'accepted')}
                            style={{
                              padding: '7px 14px', background: '#10b981', color: 'white',
                              border: 'none', borderRadius: 7, fontSize: 12,
                              fontWeight: 500, cursor: 'pointer'
                            }}>
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(appt.id, 'rejected')}
                            style={{
                              padding: '7px 14px', background: '#ef4444', color: 'white',
                              border: 'none', borderRadius: 7, fontSize: 12,
                              fontWeight: 500, cursor: 'pointer'
                            }}>
                            Reject
                          </button>
                        </>
                      )}
                      {user?.role === 'doctor' && appt.status === 'accepted' && (
                        <button
                          onClick={() => handleStatusUpdate(appt.id, 'completed')}
                          style={{
                            padding: '7px 14px', background: '#8b5cf6', color: 'white',
                            border: 'none', borderRadius: 7, fontSize: 12,
                            fontWeight: 500, cursor: 'pointer'
                          }}>
                          Mark Complete
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    pending:   { bg: '#fef3c7', color: '#92400e' },
    accepted:  { bg: '#d1fae5', color: '#065f46' },
    rejected:  { bg: '#fee2e2', color: '#991b1b' },
    completed: { bg: '#dbeafe', color: '#1e40af' },
  };
  const c = colors[status] || colors.pending;
  return (
    <span style={{
      padding: '5px 14px', borderRadius: 20, fontSize: 12,
      fontWeight: 500, background: c.bg, color: c.color,
      textTransform: 'capitalize'
    }}>{status}</span>
  );
}