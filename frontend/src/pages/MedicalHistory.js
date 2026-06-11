import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import toast from 'react-hot-toast';

const TYPES = ['diagnosis', 'prescription', 'lab_result', 'surgery', 'allergy', 'vaccination', 'other'];
const TYPE_ICONS = {
  diagnosis: '🩺', prescription: '💊', lab_result: '🧪',
  surgery: '🏥', allergy: '⚠️', vaccination: '💉', other: '📋'
};

export default function MedicalHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({
    title: '', record_type: 'diagnosis', description: '',
    date: '', doctor_name: '', hospital: ''
  });

  const fetchRecords = () => {
    setLoading(true);
    API.get('/auth/medical-history/')
      .then(res => setRecords(res.data))
      .catch(() => toast.error('Failed to load records'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchRecords(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/medical-history/', form);
      toast.success('Record added!');
      setShowForm(false);
      setForm({ title: '', record_type: 'diagnosis', description: '', date: '', doctor_name: '', hospital: '' });
      fetchRecords();
    } catch {
      toast.error('Failed to add record.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await API.delete(`/auth/medical-history/${id}/`);
      toast.success('Record deleted.');
      fetchRecords();
    } catch {
      toast.error('Failed to delete.');
    }
  };

  const filtered = filter === 'all' ? records : records.filter(r => r.record_type === filter);

  const inputStyle = {
    width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0',
    borderRadius: 8, fontSize: 14, outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
        padding: '36px 40px', color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>📋 Medical History</h1>
            <p style={{ opacity: 0.88, fontSize: 14 }}>Keep track of your health records</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            padding: '10px 22px', background: 'rgba(255,255,255,0.2)',
            color: 'white', border: '1.5px solid rgba(255,255,255,0.4)',
            borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer'
          }}>
            {showForm ? '✕ Cancel' : '+ Add Record'}
          </button>
        </div>
      </div>

      <div style={{ padding: '28px 40px' }}>
        {/* Add record form */}
        {showForm && (
          <div style={{
            background: 'white', borderRadius: 14, padding: 24,
            boxShadow: '0 4px 12px rgba(0,0,0,0.07)', marginBottom: 24
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 18, color: '#0f172a' }}>
              Add New Record
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Title
                  </label>
                  <input style={inputStyle} placeholder="e.g. Blood Test Results"
                    value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Record Type
                  </label>
                  <select style={inputStyle} value={form.record_type}
                    onChange={e => setForm({ ...form, record_type: e.target.value })}>
                    {TYPES.map(t => (
                      <option key={t} value={t}>{TYPE_ICONS[t]} {t.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Date
                  </label>
                  <input style={inputStyle} type="date" value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })} required />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Doctor Name
                  </label>
                  <input style={inputStyle} placeholder="Dr. Name (optional)"
                    value={form.doctor_name} onChange={e => setForm({ ...form, doctor_name: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Hospital / Clinic
                  </label>
                  <input style={inputStyle} placeholder="Hospital name (optional)"
                    value={form.hospital} onChange={e => setForm({ ...form, hospital: e.target.value })} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Description
                  </label>
                  <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }}
                    placeholder="Details about this record..."
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })} required />
                </div>
              </div>
              <button type="submit" style={{
                marginTop: 16, padding: '10px 24px',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                color: 'white', border: 'none', borderRadius: 8,
                fontSize: 14, fontWeight: 600, cursor: 'pointer'
              }}>Save Record</button>
            </form>
          </div>
        )}

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          <FilterBtn label="All" active={filter === 'all'} onClick={() => setFilter('all')} />
          {TYPES.map(t => (
            <FilterBtn key={t} label={`${TYPE_ICONS[t]} ${t.replace('_', ' ')}`}
              active={filter === t} onClick={() => setFilter(t)} />
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            <div style={{ fontSize: 40 }}>⏳</div>
            <p style={{ marginTop: 12 }}>Loading records...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            <div style={{ fontSize: 48 }}>📭</div>
            <p style={{ marginTop: 12, fontSize: 15 }}>No medical records yet</p>
            <p style={{ fontSize: 13, marginTop: 6 }}>Click "Add Record" to get started</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
            {filtered.map(record => (
              <div key={record.id} style={{
                background: 'white', borderRadius: 14, padding: 20,
                boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
                borderLeft: '4px solid #0ea5e9'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 24 }}>{TYPE_ICONS[record.record_type]}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{record.title}</div>
                      <div style={{ fontSize: 12, color: '#0ea5e9', textTransform: 'capitalize', marginTop: 2 }}>
                        {record.record_type.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(record.id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#ef4444', fontSize: 16, padding: 4
                  }}>🗑️</button>
                </div>
                <p style={{ fontSize: 13, color: '#64748b', margin: '12px 0', lineHeight: 1.6 }}>
                  {record.description}
                </p>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#94a3b8' }}>
                  <span>📅 {record.date}</span>
                  {record.doctor_name && <span>👨‍⚕️ {record.doctor_name}</span>}
                  {record.hospital && <span>🏥 {record.hospital}</span>}
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
      padding: '6px 14px', borderRadius: 20,
      border: `1.5px solid ${active ? '#0ea5e9' : '#e2e8f0'}`,
      background: active ? '#0ea5e9' : 'white',
      color: active ? 'white' : '#64748b',
      fontSize: 12, fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize'
    }}>{label}</button>
  );
}