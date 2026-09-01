import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import EventGrid from './components/EventGrid';
import EventDetailModal from './components/EventDetailModal';
import RSVPModal from './components/RSVPModal';
import CreateEventModal from './components/CreateEventModal';
import MyTicketsModal from './components/MyTicketsModal';
import Toast from './components/Toast';
import { initialEvents } from './data/mockEvents';

export default function App() {
  // Theme state - default Light Mode as requested
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('eventpulse_theme') || 'light';
  });

  // Events state synced with localStorage
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('eventpulse_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  // User's booked tickets synced with localStorage
  const [userTickets, setUserTickets] = useState(() => {
    const saved = localStorage.getItem('eventpulse_tickets');
    return saved ? JSON.parse(saved) : [];
  });

  // Filtering & View state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'tickets'

  // Modal states
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpEvent, setRsvpEvent] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('eventpulse_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('eventpulse_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eventpulse_tickets', JSON.stringify(userTickets));
  }, [userTickets]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Create new event handler
  const handleCreateEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
    addToast(`Event "${newEvent.title}" published successfully!`);
  };

  // Confirm booking handler
  const handleConfirmBooking = (ticket, eventId, qty) => {
    setUserTickets(prev => [ticket, ...prev]);
    
    // Update registered count on event
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return { ...evt, registered: (evt.registered || 0) + qty };
      }
      return evt;
    }));

    addToast(`Booked ${qty} ticket(s) for "${ticket.eventTitle}"!`);
  };

  // Cancel booking handler
  const handleCancelTicket = (ticketId, eventId, qty) => {
    setUserTickets(prev => prev.filter(t => t.ticketId !== ticketId));

    // Reduce registered count on event
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return { ...evt, registered: Math.max(0, (evt.registered || 0) - qty) };
      }
      return evt;
    }));

    addToast('Ticket booking cancelled.', 'info');
  };

  // Filter events based on search query and category
  const filteredEvents = events.filter(evt => {
    const matchesSearch = 
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'All' || evt.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        ticketCount={userTickets.length}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {activeTab === 'explore' ? (
        <>
          <StatsOverview events={events} myTickets={userTickets} />

          <EventGrid
            events={filteredEvents}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectEvent={(evt) => setSelectedEvent(evt)}
            onQuickRSVP={(evt) => setRsvpEvent(evt)}
            userTickets={userTickets}
          />
        </>
      ) : (
        <MyTicketsModal
          userTickets={userTickets}
          onCancelTicket={handleCancelTicket}
          onExploreMore={() => setActiveTab('explore')}
        />
      )}

      {/* Modals */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRSVP={(evt) => setRsvpEvent(evt)}
          isUserRegistered={userTickets.some(t => t.eventId === selectedEvent.id)}
        />
      )}

      {rsvpEvent && (
        <RSVPModal
          event={rsvpEvent}
          onClose={() => setRsvpEvent(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {isCreateModalOpen && (
        <CreateEventModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreateEvent={handleCreateEvent}
        />
      )}

      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
