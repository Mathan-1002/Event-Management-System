import React from 'react';
import { Calendar, Search, PlusCircle, Ticket, Sun, Moon, LayoutGrid } from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  activeTab, 
  setActiveTab, 
  onOpenCreateModal,
  ticketCount,
  theme,
  toggleTheme 
}) {
  return (
    <header className="navbar">
      <div className="brand" onClick={() => setActiveTab('explore')}>
        <div className="brand-icon">
          <Calendar size={22} />
        </div>
        <span>EventPulse</span>
      </div>

      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search events by title, location, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="nav-actions">
        <button
          className={`btn ${activeTab === 'explore' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('explore')}
        >
          <LayoutGrid size={16} />
          Explore
        </button>

        <button
          className={`btn ${activeTab === 'tickets' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('tickets')}
          style={{ position: 'relative' }}
        >
          <Ticket size={16} />
          My Tickets
          {ticketCount > 0 && (
            <span style={{
              backgroundColor: activeTab === 'tickets' ? '#ffffff' : 'var(--primary)',
              color: activeTab === 'tickets' ? 'var(--primary)' : '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 800,
              padding: '0.1rem 0.45rem',
              borderRadius: '999px',
              marginLeft: '0.2rem'
            }}>
              {ticketCount}
            </span>
          )}
        </button>

        <button 
          className="btn btn-outline"
          onClick={onOpenCreateModal}
        >
          <PlusCircle size={16} />
          + Create Event
        </button>

        <button
          className="btn-icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}
