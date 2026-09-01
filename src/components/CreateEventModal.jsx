import React, { useState } from 'react';
import { X, PlusCircle, Image, Calendar, MapPin, DollarSign, Users } from 'lucide-react';

const COVER_PRESETS = [
  { label: 'Tech & AI', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80' },
  { label: 'Music & Concert', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80' },
  { label: 'Workshop & Design', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80' },
  { label: 'Business Pitch', url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sports & Wellness', url: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80' }
];

export default function CreateEventModal({ onClose, onCreateEvent }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('Free');
  const [capacity, setCapacity] = useState(100);
  const [selectedImage, setSelectedImage] = useState(COVER_PRESETS[0].url);
  const [description, setDescription] = useState('');
  const [organizer, setOrganizer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !location || !description) return;

    const newEvent = {
      id: `evt-${Date.now()}`,
      title,
      category,
      date,
      time: time || '10:00 AM - 04:00 PM',
      location,
      type: 'In-Person',
      price: price.toLowerCase() === 'free' || price === '0' ? 'Free' : `$${price.replace('$', '')}`,
      priceNumber: price.toLowerCase() === 'free' ? 0 : Number(price.replace('$', '')),
      capacity: Number(capacity),
      registered: 0,
      image: selectedImage,
      description,
      organizer: organizer || 'Community Host',
      speakers: [],
      agenda: [
        { time: time ? time.split('-')[0] : '10:00 AM', topic: 'Welcome & Introduction' },
        { time: '12:00 PM', topic: 'Main Session & Keynote' }
      ]
    };

    onCreateEvent(newEvent);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Create New Event</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Event Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. AI & Future of Web Development Conference"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Tech">Tech</option>
                  <option value="Music">Music</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Business">Business</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Organizer Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Tech Collective"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  className="form-input"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Time Range</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 09:00 AM - 04:00 PM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Location / Venue Address *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Downtown Innovation Hub, Room 302"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Ticket Price</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Free or amount (e.g. 29)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Max Seat Capacity</label>
                <input
                  type="number"
                  className="form-input"
                  min="1"
                  max="10000"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Choose Cover Image</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {COVER_PRESETS.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(preset.url)}
                    style={{
                      height: '50px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImage === preset.url ? '2px solid var(--primary)' : '2px solid transparent',
                      opacity: selectedImage === preset.url ? 1 : 0.6,
                      transition: 'var(--transition)'
                    }}
                    title={preset.label}
                  >
                    <img src={preset.url} alt={preset.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Event Description *</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Describe what attendees can expect from this event..."
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <PlusCircle size={16} /> Publish Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
