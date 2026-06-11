import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import toast from 'react-hot-toast';

const BACKEND_URL = 'https://healthcare-backend-hzbg.onrender.com';

export default function Profile() {
  const { user, fetchProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    date_of_birth: user?.date_of_birth || '',
    address: user?.address || '',
    blood_group: user?.blood_group || '',
    emergency_contact: user?.emergency_contact || '',
  });

  const [doctorForm, setDoctorForm] = useState({
    specialization: user?.doctor_profile?.specialization || 'general',
    experience_years: user?.doctor_profile?.experience_years || 0,
    bio: user?.doctor_profile?.bio || '',
    consultation_fee: user?.doctor_profile?.consultation_fee || 0,
    available_days: user?.doctor_profile?.available_days || 'Monday,Tuesday,Wednesday,Thursday,Friday',
    available_time_start: user?.doctor_profile?.available_time_start || '09:00',
    available_time_end: user?.doctor_profile?.available_time_end || '17:00',
    is_available: user?.doctor_profile?.is_available ?? true,
  });

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const selectedDays = doctorForm.available_days.split(',').filter(Boolean);

  const toggleDay = (day) => {
    const days = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    setDoctorForm({ ...doctorForm, available_days: days.join(',') });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (val) formData.append(key, val);
      });
      if (photo) formData.append('profile_picture', photo);
      await API.patch('/auth/profile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await fetchProfile();
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to update.');
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0',
    borderRadius: 8, fontSize: 14, outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit', background: 'white'
  };
  const lbl = {
    fontSize: 13, fontWeight: 500, color: '#374151',
    display: 'block', marginBottom: 6
  };
  const grp = { marginBottom: 20 };

  const tabs = user?.role === 'doctor'
    ? [{ id: 'personal', label: '👤 Personal' }, { id: 'doctor', label: '🏥 Doctor Settings' }]
    : [{ id: 'personal', label: '👤 Personal' }];

  const getAvatarSrc = () => {
    if (preview) return preview;
    if (user?.profile_picture) return BACKEND_URL + user.profile_picture;
    return null;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
        padding: '40px 48px 80px', color: 'white'
      }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>👤 My Profile</h1>
        <p style={{ opacity: 0.88, fontSize: 14 }}>Manage your personal information and settings</p>
      </div>

      <div style={{ maxWidth: 900, margin: '-48px auto 0', padding: '0 24px 48px' }}>

        {/* Profile card top */}
        <div style={{
          background: 'white', borderRadius: 16, padding: 28,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 24
        }}>

          {/* Avatar with upload button */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 88, height: 88, borderRadius: '50%',
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, color: 'white', overflow: 'hidden',
              border: '4px solid white', boxShadow: '0 4px 16px rgba(14,165,233,0.3)'
            }}>
              {getAvatarSrc()
                ? <img src={getAvatarSrc()} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : user?.first_name ? user.first_name[0].toUpperCase() : '👤'}
            </div>
            <label style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 28, height: 28, borderRadius: '50%',
              background: 'white', border: '2px solid #e2e8f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 13, boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              📷
              <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Name and role */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>
              {user?.first_name ? user.first_name + ' ' + user.last_name : user?.username}
            </div>
            <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{user?.email}</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{
                background: user?.role === 'doctor' ? '#d1fae5' : '#dbeafe',
                color: user?.role === 'doctor' ? '#065f46' : '#1e40af',
                padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500
              }}>
                {user?.role === 'doctor' ? '👨‍⚕️ Doctor' : '🧑‍💼 Patient'}
              </span>
              {user?.doctor_profile?.specialization && (
                <span style={{
                  background: '#fef3c7', color: '#92400e',
                  padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                  textTransform: 'capitalize'
                }}>
                  {user.doctor_profile.specialization}
                </span>
              )}
              {user?.blood_group && (
                <span style={{
                  background: '#fee2e2', color: '#991b1b',
                  padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500
                }}>
                  🩸 {user.blood_group}
                </span>
              )}
            </div>
          </div>

          <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'right' }}>
            <div>Click 📷 icon to</div>
            <div>change photo</div>
          </div>
        </div>

        {/* Tabs */}
        {user?.role === 'doctor' && (
          <div style={{
            display: 'flex', gap: 4, marginBottom: 16,
            background: 'white', borderRadius: 10, padding: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                flex: 1, padding: '10px', borderRadius: 8, border: 'none',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #0ea5e9, #06b6d4)' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#64748b',
                fontWeight: 500, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s'
              }}>{tab.label}</button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Personal info tab */}
          {activeTab === 'personal' && (
            <div style={{
              background: 'white', borderRadius: 14, padding: 28,
              boxShadow: '0 4px 16px rgba(0,0,0,0.07)', marginBottom: 20
            }}>
              <h2 style={{
                fontSize: 16, fontWeight: 600, color: '#0f172a',
                marginBottom: 24, paddingBottom: 12, borderBottom: '1px solid #f1f5f9'
              }}>
                Personal Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div style={grp}>
                  <label style={lbl}>First Name</label>
                  <input style={inp} placeholder="John"
                    value={form.first_name}
                    onChange={e => setForm({ ...form, first_name: e.target.value })} />
                </div>
                <div style={grp}>
                  <label style={lbl}>Last Name</label>
                  <input style={inp} placeholder="Doe"
                    value={form.last_name}
                    onChange={e => setForm({ ...form, last_name: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div style={grp}>
                  <label style={lbl}>Email Address</label>
                  <input style={inp} type="email" placeholder="john@email.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div style={grp}>
                  <label style={lbl}>Phone Number</label>
                  <input style={inp} placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div style={grp}>
                  <label style={lbl}>Date of Birth</label>
                  <input style={inp} type="date"
                    value={form.date_of_birth}
                    onChange={e => setForm({ ...form, date_of_birth: e.target.value })} />
                </div>
                <div style={grp}>
                  <label style={lbl}>Blood Group</label>
                  <select style={inp} value={form.blood_group}
                    onChange={e => setForm({ ...form, blood_group: e.target.value })}>
                    <option value="">Select blood group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div style={grp}>
                  <label style={lbl}>Emergency Contact</label>
                  <input style={inp} placeholder="+91 98765 43210"
                    value={form.emergency_contact}
                    onChange={e => setForm({ ...form, emergency_contact: e.target.value })} />
                </div>
                <div style={grp}>
                  <label style={lbl}>Address</label>
                  <input style={inp} placeholder="Your address"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {/* Doctor settings tab */}
          {activeTab === 'doctor' && user?.role === 'doctor' && (
            <div style={{
              background: 'white', borderRadius: 14, padding: 28,
              boxShadow: '0 4px 16px rgba(0,0,0,0.07)', marginBottom: 20
            }}>
              <h2 style={{
                fontSize: 16, fontWeight: 600, color: '#0f172a',
                marginBottom: 24, paddingBottom: 12, borderBottom: '1px solid #f1f5f9'
              }}>
                Doctor Settings and Availability
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div style={grp}>
                  <label style={lbl}>Specialization</label>
                  <select style={inp} value={doctorForm.specialization}
                    onChange={e => setDoctorForm({ ...doctorForm, specialization: e.target.value })}>
                    {[
                      ['general', 'General Physician'],
                      ['cardiology', 'Cardiology'],
                      ['dermatology', 'Dermatology'],
                      ['neurology', 'Neurology'],
                      ['orthopedics', 'Orthopedics'],
                      ['pediatrics', 'Pediatrics'],
                      ['psychiatry', 'Psychiatry']
                    ].map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                <div style={grp}>
                  <label style={lbl}>Years of Experience</label>
                  <input style={inp} type="number" min="0"
                    value={doctorForm.experience_years}
                    onChange={e => setDoctorForm({ ...doctorForm, experience_years: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div style={grp}>
                  <label style={lbl}>Consultation Fee</label>
                  <input style={inp} type="number" min="0"
                    value={doctorForm.consultation_fee}
                    onChange={e => setDoctorForm({ ...doctorForm, consultation_fee: e.target.value })} />
                </div>
                <div style={grp}>
                  <label style={lbl}>Currently Accepting Patients</label>
                  <select style={inp} value={String(doctorForm.is_available)}
                    onChange={e => setDoctorForm({ ...doctorForm, is_available: e.target.value === 'true' })}>
                    <option value="true">Yes, available</option>
                    <option value="false">Not available</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div style={grp}>
                  <label style={lbl}>Available From</label>
                  <input style={inp} type="time"
                    value={doctorForm.available_time_start}
                    onChange={e => setDoctorForm({ ...doctorForm, available_time_start: e.target.value })} />
                </div>
                <div style={grp}>
                  <label style={lbl}>Available Until</label>
                  <input style={inp} type="time"
                    value={doctorForm.available_time_end}
                    onChange={e => setDoctorForm({ ...doctorForm, available_time_end: e.target.value })} />
                </div>
              </div>

              <div style={grp}>
                <label style={lbl}>Available Days</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                  {DAYS.map(day => (
                    <button key={day} type="button" onClick={() => toggleDay(day)} style={{
                      padding: '8px 16px', borderRadius: 8,
                      border: '1.5px solid ' + (selectedDays.includes(day) ? '#0ea5e9' : '#e2e8f0'),
                      background: selectedDays.includes(day) ? '#e0f2fe' : 'white',
                      color: selectedDays.includes(day) ? '#0284c7' : '#64748b',
                      fontSize: 13, fontWeight: 500, cursor: 'pointer'
                    }}>{day.slice(0, 3)}</button>
                  ))}
                </div>
              </div>

              <div style={grp}>
                <label style={lbl}>Professional Bio</label>
                <textarea
                  style={{ ...inp, height: 100, resize: 'vertical' }}
                  placeholder="Tell patients about your experience..."
                  value={doctorForm.bio}
                  onChange={e => setDoctorForm({ ...doctorForm, bio: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Save button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={loading} style={{
              padding: '12px 32px',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              color: 'white', border: 'none', borderRadius: 8,
              fontSize: 15, fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(14,165,233,0.3)'
            }}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}