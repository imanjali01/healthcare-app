import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success('Message sent! We will get back to you soon.');
  };

  const inp = {
    width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0',
    borderRadius: 8, fontSize: 14, outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit', background: 'white'
  };
  const lbl = { fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e, #0ea5e9)',
        padding: '70px 60px', textAlign: 'center', color: 'white'
      }}>
        <h1 style={{ fontSize: 44, fontWeight: 800, marginBottom: 14 }}>Contact Us</h1>
        <p style={{ fontSize: 17, opacity: 0.88, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          Have a question or need help? We are here for you. Send us a message and we will respond within 24 hours.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48 }}>

          {/* Left info */}
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Get in touch</h2>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 32 }}>
              Fill out the form and our team will get back to you as soon as possible.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
              {[
                { emoji: '📧', title: 'Email', value: 'support@healthcare-plus.com', sub: 'We reply within 24 hours' },
                { emoji: '📞', title: 'Phone', value: '+91 98765 43210', sub: 'Mon–Fri, 9am to 6pm' },
                { emoji: '📍', title: 'Address', value: 'HealthCare+ HQ, Tech Park, Ludhiana, Punjab', sub: 'India — 141001' },
              ].map(c => (
                <div key={c.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
                  }}>{c.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#0f172a' }}>{c.title}</div>
                    <div style={{ fontSize: 13, color: '#0ea5e9', margin: '2px 0' }}>{c.value}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#f0f9ff', borderRadius: 12, padding: 20, border: '1px solid #bae6fd' }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#0284c7', marginBottom: 12 }}>💡 Common questions</div>
              {[
                'How do I reset my password?',
                'Can I cancel an appointment?',
                'How do doctors verify their profile?',
                'Is my health data secure?',
              ].map(q => (
                <div key={q} style={{
                  fontSize: 13, color: '#0369a1', padding: '7px 0',
                  borderBottom: '1px solid #e0f2fe', cursor: 'pointer'
                }}>→ {q}</div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div style={{
            background: 'white', borderRadius: 16, padding: 36,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 24 }}>
                  Thank you! Our team will get back to you at <strong>{form.email}</strong> within 24 hours.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} style={{
                  padding: '10px 24px',
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  color: 'white', border: 'none', borderRadius: 8,
                  fontSize: 14, fontWeight: 600, cursor: 'pointer'
                }}>Send Another Message</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>Send us a message</h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={lbl}>Full Name *</label>
                      <input style={inp} placeholder="John Doe"
                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div>
                      <label style={lbl}>Email Address *</label>
                      <input style={inp} type="email" placeholder="john@email.com"
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={lbl}>Subject *</label>
                    <select style={inp} value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })} required>
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="appointment">Appointment Issue</option>
                      <option value="account">Account Problem</option>
                      <option value="feedback">Feedback / Suggestion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={lbl}>Message *</label>
                    <textarea style={{ ...inp, height: 130, resize: 'vertical' }}
                      placeholder="Describe your question or issue..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })} required />
                  </div>
                  <button type="submit" disabled={loading} style={{
                    width: '100%', padding: 13,
                    background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                    color: 'white', border: 'none', borderRadius: 8,
                    fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer'
                  }}>
                    {loading ? 'Sending...' : '📨 Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}