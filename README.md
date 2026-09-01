# EventPulse - Simple Event Management System (React)

A modern, simple, and clean Event Management Application built with React, Vite, Lucide Icons, and Vanilla CSS in a Light Mode design.

## ✨ Features

- **Interactive Event Catalog**: Browse events with category filters (Tech, Music, Workshop, Business, Sports) and real-time search.
- **Event Details Modal**: View comprehensive event details, venue address, featured speaker bios, and schedule agenda.
- **RSVP & Digital Pass Generation**: Book tickets and receive an instant **Digital Admission Ticket with QR Code** and unique pass ID.
- **Create & Publish Events**: Simple form modal to add new events with cover image presets, date/time pickers, seat capacity, and ticket pricing.
- **My Booked Tickets View**: View active registrations, access QR passes, or cancel bookings.
- **LocalStorage Sync**: Edits, registrations, and created events persist across page refreshes.
- **Zero-Dependency Standalone Option**: Includes a standalone single HTML version (`standalone.html`) that can be opened without Node.js or `node_modules`.

---

## 🚀 Quick Start (Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 📁 Project Structure

```text
Event Management System/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Navbar with search, tabs, theme toggle & CTA
│   │   ├── StatsOverview.jsx    # Metrics overview cards
│   │   ├── EventGrid.jsx        # Category filters & event cards grid
│   │   ├── EventCard.jsx        # Individual event card
│   │   ├── EventDetailModal.jsx # Detailed event view modal
│   │   ├── RSVPModal.jsx        # Ticket booking & Digital Pass generation
│   │   ├── CreateEventModal.jsx # New event form modal
│   │   ├── MyTicketsModal.jsx   # User booked tickets manager
│   │   └── Toast.jsx            # Notification toast popups
│   ├── data/
│   │   └── mockEvents.js        # Initial sample dataset
│   ├── styles/
│   │   └── index.css            # Light Mode CSS design system
│   ├── App.jsx                  # State management & localStorage sync
│   └── main.jsx                 # Application entry point
├── index.html                   # HTML template
├── standalone.html              # Standalone 1-file version (No Node required)
├── package.json                 # Dependencies & scripts
└── vite.config.js               # Vite configuration
```

---

## 📜 License

MIT License. Free for personal and commercial use.
