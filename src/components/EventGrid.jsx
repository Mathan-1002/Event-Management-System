import React from 'react';
import EventCard from './EventCard';
import { SearchX } from 'lucide-react';

export default function EventGrid({ 
  events, 
  selectedCategory, 
  setSelectedCategory, 
  onSelectEvent, 
  onQuickRSVP,
  userTickets 
}) {
  const categories = ['All', 'Tech', 'Music', 'Workshop', 'Business', 'Sports'];

  const userBookedEventIds = new Set(userTickets.map(t => t.eventId));

  return (
    <section>
      <div className="filter-bar">
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'All' ? '✨ All Events' : cat}
            </button>
          ))}
        </div>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <SearchX size={32} />
          </div>
          <h3 className="empty-title">No events found</h3>
          <p className="empty-subtitle">
            We couldn't find any events matching your search or category filter. Try clearing filters or creating a new event!
          </p>
          <button 
            className="btn btn-secondary"
            onClick={() => setSelectedCategory('All')}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelectEvent={onSelectEvent}
              onQuickRSVP={onQuickRSVP}
              isUserRegistered={userBookedEventIds.has(event.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
