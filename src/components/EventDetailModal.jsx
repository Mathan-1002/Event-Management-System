import React from 'react';
import { X, Calendar, MapPin, Users, Ticket, Clock, UserCheck, ShieldCheck } from 'lucide-react';

export default function EventDetailModal({ event, onClose, onRSVP, isUserRegistered }) {
  if (!event) return null;

  const spotsLeft = event.capacity - (event.registered || 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge-tech" style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
              {event.category}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
              {event.type || 'Event'}
            </span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '220px', marginBottom: '1.25rem' }}>
            <img 
              src={event.image} 
              alt={event.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            {event.title}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', backgroundColor: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Calendar size={16} style={{ color: 'var(--primary)' }} />
              <div>
                <strong>Date & Time</strong>
                <div style={{ color: 'var(--text-muted)' }}>{event.date} ({event.time})</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <MapPin size={16} style={{ color: 'var(--primary)' }} />
              <div>
                <strong>Location</strong>
                <div style={{ color: 'var(--text-muted)' }}>{event.location}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Ticket size={16} style={{ color: 'var(--primary)' }} />
              <div>
                <strong>Ticket Price</strong>
                <div style={{ color: 'var(--text-muted)' }}>{event.price || 'Free'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Users size={16} style={{ color: 'var(--primary)' }} />
              <div>
                <strong>Availability</strong>
                <div style={{ color: spotsLeft > 0 ? 'var(--accent-green)' : 'var(--accent-rose)', fontWeight: 600 }}>
                  {spotsLeft > 0 ? `${spotsLeft} seats remaining` : 'Fully Booked'}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>About This Event</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              {event.description}
            </p>
          </div>

          {event.speakers && event.speakers.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Featured Speakers</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {event.speakers.map((s, idx) => (
                  <div key={idx} style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <UserCheck size={16} style={{ color: 'var(--primary)' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{s.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {event.agenda && event.agenda.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Event Schedule Agenda</h4>
              <div style={{ borderLeft: '2px solid var(--primary-border)', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {event.agenda.map((item, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>{item.time}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{item.topic}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>

            {isUserRegistered ? (
              <button className="btn" style={{ backgroundColor: 'var(--accent-green-bg)', color: 'var(--accent-green)', borderColor: 'var(--accent-green)' }} disabled>
                <ShieldCheck size={16} /> Ticket Confirmed
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                  onRSVP(event);
                }}
                disabled={spotsLeft <= 0}
              >
                <Ticket size={16} />
                {spotsLeft > 0 ? 'Proceed to Book Ticket' : 'Sold Out'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
