import React, { useState } from 'react';
import { X, Ticket, CheckCircle2, QrCode, Download, User, Mail } from 'lucide-react';

export default function RSVPModal({ event, onClose, onConfirmBooking }) {
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [bookedTicket, setBookedTicket] = useState(null);

  if (!event) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!attendeeName || !attendeeEmail) return;

    const newTicket = {
      ticketId: `EP-${Math.floor(100000 + Math.random() * 900000)}`,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      attendeeName,
      attendeeEmail,
      ticketQuantity: Number(ticketQuantity),
      pricePaid: event.price === 'Free' ? 'Free ($0)' : event.price,
      bookedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onConfirmBooking(newTicket, event.id, Number(ticketQuantity));
    setBookedTicket(newTicket);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {bookedTicket ? '🎉 Registration Confirmed!' : 'Book Event Pass'}
          </h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {!bookedTicket ? (
            <form onSubmit={handleSubmit}>
              <div style={{ backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', border: '1px solid var(--primary-border)' }}>
                <h4 style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{event.title}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {event.date} • {event.time} | <strong>{event.price || 'Free'}</strong>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Alex Morgan"
                    required
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="e.g. alex@example.com"
                  required
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Number of Tickets</label>
                <select
                  className="form-select"
                  value={ticketQuantity}
                  onChange={(e) => setTicketQuantity(e.target.value)}
                >
                  <option value={1}>1 Ticket</option>
                  <option value={2}>2 Tickets</option>
                  <option value={3}>3 Tickets</option>
                  <option value={4}>4 Tickets</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <CheckCircle2 size={16} /> Confirm RSVP
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Your ticket registration is complete! Show this digital pass or QR code at the event entrance.
              </p>

              {/* Digital Pass Ticket Box */}
              <div className="ticket-pass">
                <div className="ticket-header">
                  <div className="ticket-brand">EventPulse Pass</div>
                  <div className="ticket-status">CONFIRMED</div>
                </div>

                <div className="ticket-body">
                  <div className="ticket-qr">
                    {/* Simulated SVG QR Code */}
                    <svg width="90" height="90" viewBox="0 0 100 100" fill="currentColor" style={{ color: 'var(--text-main)' }}>
                      <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v10 h-10 z M10,40 h10 v10 h-10 z M40,40 h20 v20 h-20 z M70,40 h10 v20 h-10 z M40,70 h10 v20 h-10 z M70,70 h20 v20 h-20 z" />
                    </svg>
                  </div>

                  <div className="ticket-details">
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.4rem' }}>
                      {bookedTicket.eventTitle}
                    </div>
                    <div className="ticket-detail-item"><strong>Ticket ID:</strong> {bookedTicket.ticketId}</div>
                    <div className="ticket-detail-item"><strong>Attendee:</strong> {bookedTicket.attendeeName} ({bookedTicket.ticketQuantity}x)</div>
                    <div className="ticket-detail-item"><strong>Date:</strong> {bookedTicket.eventDate}</div>
                    <div className="ticket-detail-item"><strong>Venue:</strong> {bookedTicket.eventLocation}</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => alert(`Simulated downloading PDF Ticket for ID: ${bookedTicket.ticketId}`)}
                >
                  <Download size={14} /> Download Pass
                </button>

                <button className="btn btn-primary" onClick={onClose}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
