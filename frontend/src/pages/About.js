import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e, #0ea5e9)',
        padding: '70px 60px', textAlign: 'center', color: 'white'
      }}>
        <h1 style={{ fontSize: 44, fontWeight: 800, marginBottom: 14 }}>About HealthCare+</h1>
        <p style={{ fontSize: 17, opacity: 0.88, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
          We are on a mission to make quality healthcare accessible, efficient, and transparent for everyone.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px' }}>

        {/* Mission */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginBottom: 72 }}>
          <div>
            <div style={{
              display: 'inline-block', background: '#e0f2fe', color: '#0284c7',
              padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, marginBottom: 14
            }}>OUR MISSION</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 16, lineHeight: 1.3 }}>
              Bridging the gap between patients and doctors
            </h2>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8, marginBottom: 16 }}>
              HealthCare+ was built to solve a real problem — traditional healthcare systems rely on manual processes, phone calls, and paper records. This leads to missed appointments, lost records, and poor communication.
            </p>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8 }}>
              Our platform brings everything digital — patients can book appointments in seconds, doctors manage schedules efficiently, and everyone gets real-time updates.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { emoji: '🎯', title: 'Our Goal', desc: 'Make healthcare accessible to everyone through technology' },
              { emoji: '💡', title: 'Our Vision', desc: 'A world where managing health is as easy as a few clicks' },
              { emoji: '🤝', title: 'Our Values', desc: 'Trust, transparency, and patient-first thinking' },
              { emoji: '🌍', title: 'Our Impact', desc: 'Helping thousands manage their health better every day' },
            ].map(item => (
              <div key={item.title} style={{
                background: 'white', borderRadius: 12, padding: 20,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.emoji}</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem vs solution */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>The problem we solve</h2>
            <p style={{ fontSize: 15, color: '#64748b' }}>Traditional healthcare has many pain points. We fix them all.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {[
              { before: '📞 Booking by phone — long wait times', after: '⚡ Instant online booking in seconds' },
              { before: '📄 Paper medical records — easy to lose', after: '☁️ Digital records stored securely forever' },
              { before: '❓ No visibility on appointment status', after: '📊 Real-time status updates always' },
              { before: '📭 No communication after booking', after: '📧 Instant email notifications sent' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 12, padding: 20,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16
              }}>
                <div style={{ background: '#fff1f2', borderRadius: 8, padding: 14, fontSize: 13, color: '#991b1b', lineHeight: 1.5 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 6, color: '#f87171' }}>BEFORE</div>
                  {item.before}
                </div>
                <div style={{ background: '#f0fdf4', borderRadius: 8, padding: 14, fontSize: 13, color: '#166534', lineHeight: 1.5 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 6, color: '#4ade80' }}>AFTER</div>
                  {item.after}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>Built with modern technology</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { emoji: '⚛️', name: 'React.js', role: 'Frontend', desc: 'Fast, interactive UI with real-time updates' },
              { emoji: '🐍', name: 'Django', role: 'Backend', desc: 'Secure Python framework powering the REST API' },
              { emoji: '🗄️', name: 'MySQL', role: 'Database', desc: 'Reliable structured database for all app data' },
              { emoji: '🔐', name: 'JWT Auth', role: 'Security', desc: 'Token-based authentication keeping data secure' },
              { emoji: '📧', name: 'Gmail SMTP', role: 'Email', desc: 'Automated email notifications for all users' },
              { emoji: '🌐', name: 'REST API', role: 'Integration', desc: 'Clean API architecture connecting frontend and backend' },
            ].map(t => (
              <div key={t.name} style={{
                background: 'white', borderRadius: 12, padding: 20,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                display: 'flex', gap: 14, alignItems: 'flex-start'
              }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{t.emoji}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: '#0ea5e9', fontWeight: 500, marginBottom: 4 }}>{t.role}</div>
                  <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
          borderRadius: 16, padding: 48, textAlign: 'center', color: 'white'
        }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>Ready to experience better healthcare?</h2>
          <p style={{ opacity: 0.88, marginBottom: 28, fontSize: 15 }}>Join HealthCare+ today — it's free to get started.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <Link to="/register" style={{
              background: 'white', color: '#0ea5e9', textDecoration: 'none',
              padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 14
            }}>Create Free Account</Link>
            <Link to="/contact" style={{
              background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)',
              color: 'white', textDecoration: 'none',
              padding: '12px 28px', borderRadius: 8, fontWeight: 600, fontSize: 14
            }}>Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}