import React from 'react';
import { Calendar, Users, Ticket, Tag } from 'lucide-react';

export default function StatsOverview({ events, myTickets }) {
  const totalEvents = events.length;
  const totalRegistered = events.reduce((acc, evt) => acc + (evt.registered || 0), 0);
  const userTicketCount = myTickets.length;
  const categoriesCount = new Set(events.map(e => e.category)).size;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
          <Calendar size={24} />
        </div>
        <div className="stat-info">
          <div className="stat-value">{totalEvents}</div>
          <div className="stat-label">Active Events</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--accent-green-bg)', color: 'var(--accent-green)' }}>
          <Users size={24} />
        </div>
        <div className="stat-info">
          <div className="stat-value">{totalRegistered}</div>
          <div className="stat-label">Total Attendees</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--accent-sky-bg)', color: 'var(--accent-sky)' }}>
          <Ticket size={24} />
        </div>
        <div className="stat-info">
          <div className="stat-value">{userTicketCount}</div>
          <div className="stat-label">My Booked Passes</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--accent-amber-bg)', color: 'var(--accent-amber)' }}>
          <Tag size={24} />
        </div>
        <div className="stat-info">
          <div className="stat-value">{categoriesCount}</div>
          <div className="stat-label">Event Categories</div>
        </div>
      </div>
    </div>
  );
}
