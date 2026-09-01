import React, { useState } from 'react';
import { Ticket, Calendar, MapPin, QrCode, Trash2, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function MyTicketsModal({ userTickets, onCancelTicket, onExploreMore }) {
  const [selectedTicketForQR, setSelectedTicketForQR] = useState(null);

  return (
    <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
            My Registered Passes & Tickets
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage your booked event registrations and access your digital admission QR passes.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={onExploreMore}>
          <ArrowLeft size={16} /> Back to Events
        </button>
      </div>

      {userTickets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Ticket size={32} />
          </div>
          <h3 className="empty-title">No tickets booked yet</h3>
          <p className="empty-subtitle">
            You haven't registered for any events yet. Explore our upcoming summit, workshops, and concerts!
          </p>
          <button className="btn btn-primary" onClick={onExploreMore}>
            Explore Events
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {userTickets.map((t) => (
            <div 
              key={t.ticketId} 
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                    Pass: {t.ticketId}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-green)', backgroundColor: 'var(--accent-green-bg)', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                    Active
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {t.eventTitle}
                </h3>

                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={14} style={{ color: 'var(--primary)' }} />
                    <span>{t.eventDate} ({t.eventTime})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={14} style={{ color: 'var(--primary)' }} />
                    <span>{t.eventLocation}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--accent-green)' }} />
                    <span>Attendee: {t.attendeeName} ({t.ticketQuantity} Pass)</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)' }}>
                <button 
                  className="btn btn-primary btn-sm" 
                  style={{ flex: 1 }}
                  onClick={() => setSelectedTicketForQR(t)}
                >
                  <QrCode size={14} /> View Digital Pass
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  title="Cancel Booking"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to cancel your ticket for "${t.eventTitle}"?`)) {
                      onCancelTicket(t.ticketId, t.eventId, t.ticketQuantity);
                    }
                  }}
                >
                  <Trash2 size={14} style={{ color: 'var(--accent-rose)' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Code / Pass Modal */}
      {selectedTicketForQR && (
        <div className="modal-overlay" onClick={() => setSelectedTicketForQR(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Digital Entry Pass</h3>
              <button className="close-btn" onClick={() => setSelectedTicketForQR(null)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="ticket-pass">
                <div className="ticket-header">
                  <div className="ticket-brand">EventPulse Admission</div>
                  <div className="ticket-status">VALID</div>
                </div>
                <div className="ticket-body" style={{ flexDirection: 'column', textAlign: 'center' }}>
                  <div className="ticket-qr" style={{ padding: '0.8rem', background: '#fff' }}>
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v10 h-10 z M10,40 h10 v10 h-10 z M40,40 h20 v20 h-20 z M70,40 h10 v20 h-10 z M40,70 h10 v20 h-10 z M70,70 h20 v20 h-20 z" />
                    </svg>
                  </div>
                  <div style={{ marginTop: '1rem', width: '100%' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>
                      {selectedTicketForQR.eventTitle}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Ticket ID: {selectedTicketForQR.ticketId}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '0.5rem' }}>
                      Attendee: {selectedTicketForQR.attendeeName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {selectedTicketForQR.eventDate} @ {selectedTicketForQR.eventLocation}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setSelectedTicketForQR(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
