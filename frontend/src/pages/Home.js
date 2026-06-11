import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f8fafc' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 50%, #06b6d4 100%)',
        minHeight: '92vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '60px', position: 'relative', overflow: 'hidden'
      }}>
        {[
          { size: 400, top: -100, right: -100, opacity: 0.08 },
          { size: 300, bottom: -80, left: -80, opacity: 0.06 },
          { size: 200, top: '40%', right: '20%', opacity: 0.05 },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute', width: c.size, height: c.size,
            borderRadius: '50%', background: 'white',
            top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            opacity: c.opacity, pointerEvents: 'none'
          }} />
        ))}

        <div style={{
          maxWidth: 1100, width: '100%',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 60, alignItems: 'center', position: 'relative'
        }}>
          <div style={{ color: 'white' }}>
            <div style={{
              display: 'inline-block', background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 20, padding: '6px 16px', fontSize: 12,
              fontWeight: 500, marginBottom: 20
            }}>🌟 Trusted by thousands of patients</div>
            <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
              Your Health,<br />
              <span style={{ color: '#bae6fd' }}>Our Priority</span>
            </h1>
            <p style={{ fontSize: 17, opacity: 0.88, lineHeight: 1.7, marginBottom: 36 }}>
              Connect with verified doctors, book appointments instantly, manage your medical history, and get real-time updates — all in one secure platform.
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              <Link to="/register" style={{
                background: 'white', color: '#0ea5e9', textDecoration: 'none',
                padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}>Book Appointment →</Link>
              <Link to="/about" style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1.5px solid rgba(255,255,255,0.4)',
                color: 'white', textDecoration: 'none',
                padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15
              }}>Learn More</Link>
            </div>
            <div style={{ display: 'flex', gap: 32, marginTop: 48 }}>
              {[['500+', 'Doctors'], ['10k+', 'Patients'], ['98%', 'Satisfaction']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 24, fontWeight: 800 }}>{num}</div>
                  <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', height: 380 }}>
            <div style={{
              position: 'absolute', top: 0, left: 20, right: 0,
              background: 'white', borderRadius: 16, padding: 24,
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                }}>👨‍⚕️</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#0f172a' }}>Dr. Priya Sharma</div>
                  <div style={{ fontSize: 12, color: '#0ea5e9' }}>Cardiologist · 12 yrs exp</div>
                </div>
                <div style={{
                  marginLeft: 'auto', background: '#d1fae5', color: '#065f46',
                  padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500
                }}>Available</div>
              </div>
              <div style={{ background: '#f0f9ff', borderRadius: 10, padding: 14, marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Next available slot</div>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>Today, 3:00 PM</div>
              </div>
              <div style={{
                width: '100%', padding: 11, textAlign: 'center',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                color: 'white', borderRadius: 8, fontWeight: 600, fontSize: 14
              }}>Book Appointment</div>
            </div>
            <div style={{
              position: 'absolute', bottom: 10, left: 0, right: 40,
              background: 'white', borderRadius: 12, padding: '14px 18px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              display: 'flex', alignItems: 'center', gap: 12
            }}>
              <div style={{ fontSize: 24 }}>✅</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>Appointment Confirmed!</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Email notification sent to patient</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '80px 60px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Everything you need</h2>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 500, margin: '0 auto' }}>
            A complete healthcare management solution for patients and doctors.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { emoji: '📅', title: 'Easy Booking', desc: 'Book appointments with any doctor in seconds. Choose your preferred date and time easily.', color: '#0ea5e9' },
            { emoji: '👨‍⚕️', title: 'Verified Doctors', desc: 'All doctors are verified with specializations, experience, and consultation fees clearly listed.', color: '#10b981' },
            { emoji: '📧', title: 'Email Alerts', desc: 'Get instant email notifications when your appointment is accepted, rejected, or completed.', color: '#8b5cf6' },
            { emoji: '📋', title: 'Medical History', desc: 'Store all your health records — diagnoses, prescriptions, lab results, and more.', color: '#f59e0b' },
            { emoji: '🔒', title: 'Secure & Private', desc: 'JWT-based authentication with role-based access keeps your health data safe.', color: '#ef4444' },
            { emoji: '📱', title: 'Works Everywhere', desc: 'Fully responsive design that works on desktop, tablet, and mobile devices.', color: '#06b6d4' },
          ].map(f => (
            <div key={f.title} style={{
              background: 'white', borderRadius: 14, padding: 28,
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)', borderTop: `3px solid ${f.color}`
            }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{f.emoji}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', padding: '80px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>How it works</h2>
            <p style={{ fontSize: 16, color: '#64748b' }}>Get started in just 3 simple steps</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { step: '01', title: 'Create Account', desc: 'Register as a patient or doctor. Fill in your details and get started instantly.', emoji: '📝' },
              { step: '02', title: 'Find Your Doctor', desc: 'Browse verified doctors by specialization. View their experience and availability.', emoji: '🔍' },
              { step: '03', title: 'Book & Get Care', desc: 'Book your appointment, get email confirmation, manage everything from your dashboard.', emoji: '🏥' },
            ].map((s, i) => (
              <div key={s.step} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, margin: '0 auto 16px',
                  boxShadow: '0 8px 24px rgba(14,165,233,0.3)'
                }}>{s.emoji}</div>
                <div style={{
                  position: 'absolute', top: -10, right: i < 2 ? -16 : 'auto',
                  fontSize: 64, fontWeight: 900, color: '#e0f2fe', zIndex: 0
                }}>{s.step}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8, position: 'relative' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #0c4a6e, #0ea5e9)',
        padding: '70px 60px', textAlign: 'center', color: 'white'
      }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Ready to get started?</h2>
        <p style={{ fontSize: 16, opacity: 0.88, marginBottom: 32 }}>
          Join thousands of patients and doctors already using HealthCare+
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <Link to="/register" style={{
            background: 'white', color: '#0ea5e9', textDecoration: 'none',
            padding: '14px 32px', borderRadius: 10, fontWeight: 700, fontSize: 15
          }}>Register as Patient</Link>
          <Link to="/register" style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1.5px solid rgba(255,255,255,0.4)',
            color: 'white', textDecoration: 'none',
            padding: '14px 32px', borderRadius: 10, fontWeight: 600, fontSize: 15
          }}>Register as Doctor</Link>
        </div>
      </div>

    </div>
  );
}