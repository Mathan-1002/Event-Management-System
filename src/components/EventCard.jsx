import React from 'react';
import { Calendar, MapPin, Users, Ticket, ArrowRight } from 'lucide-react';

export default function EventCard({ event, onSelectEvent, onQuickRSVP, isUserRegistered }) {
  const getBadgeClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'tech': return 'badge-tech';
      case 'music': return 'badge-music';
      case 'workshop': return 'badge-workshop';
      case 'business': return 'badge-business';
      case 'sports': return 'badge-sports';
      default: return 'badge-default';
    }
  };

  const spotsLeft = event.capacity - (event.registered || 0);
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="event-card">
      <div className="event-image-wrap">
        <img 
          src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'} 
          alt={event.title} 
          className="event-image"
          loading="lazy"
        />
        <span className={`event-badge ${getBadgeClass(event.category)}`}>
          {event.category}
        </span>
        <span className="price-tag">
          {event.price || 'Free'}
        </span>
      </div>

      <div className="event-content">
        <div className="event-date-row">
          <Calendar size={14} />
          <span>{formattedDate} • {event.time || 'TBA'}</span>
        </div>

        <h3 className="event-title" onClick={() => onSelectEvent(event)} style={{ cursor: 'pointer' }}>
          {event.title}
        </h3>

        <p className="event-description">
          {event.description}
        </p>

        <div className="event-meta-info">
          <div className="meta-item">
            <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
            <span>{event.location}</span>
          </div>
          <div className="meta-item">
            <Users size={14} style={{ color: 'var(--text-muted)' }} />
            <span className={`capacity-indicator ${spotsLeft <= 10 ? 'spots-low' : 'spots-ok'}`}>
              {spotsLeft > 0 ? `${spotsLeft} spots available` : 'Sold Out'}
            </span>
          </div>
        </div>

        <div className="event-footer">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onSelectEvent(event)}
          >
            Details
          </button>

          {isUserRegistered ? (
            <button className="btn btn-sm" style={{ backgroundColor: 'var(--accent-green-bg)', color: 'var(--accent-green)', borderColor: 'var(--accent-green)' }} disabled>
              ✓ Booked
            </button>
          ) : (
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onQuickRSVP(event)}
              disabled={spotsLeft <= 0}
            >
              <Ticket size={14} />
              {spotsLeft > 0 ? 'Book Ticket' : 'Sold Out'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
