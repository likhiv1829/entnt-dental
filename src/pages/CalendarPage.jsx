import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { loadIncidents, loadPatients } from '../utils/localStorageHelpers';
import '../App.css';


export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const incidents = loadIncidents();
    const patients = loadPatients();

    const mapped = incidents.map(i => {
      const patient = patients.find(p => p.id === i.patientId);
      const startDate = new Date(i.appointmentDate);
      const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

      return {
        id: i.id,
        title: `${patient ? patient.name : "Unknown"} - ${i.title}`,
        start: startDate,
        end: endDate,
        color: i.status === 'Completed' ? '#16a34a' : '#dc2626',
        extendedProps: {
          status: i.status,
          comments: i.comments,
          cost: i.cost,
          diseaseTitle: i.title
        }
      };
    });

    setAllEvents(mapped);
    setEvents(applyAllDay(mapped, 'dayGridMonth'));
  }, []);

  function applyAllDay(events, view) {
    if (view === 'dayGridMonth') {
      return events.map(e => ({ ...e, allDay: true }));
    } else {
      return events.map(e => ({ ...e, allDay: false }));
    }
  }

  function handleViewChange(arg) {
    const viewName = arg.view.type;
    setCurrentView(viewName);
    setEvents(applyAllDay(allEvents, viewName));
  }

  function handleEventClick(info) {
    setSelectedEvent({
      title: info.event.title,
      data: info.event.extendedProps
    });
  }

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-blue-400">📅 Calendar View</h1>

      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek'
        }}
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventClassNames={() => 'custom-event'} 
        height="auto"
        datesSet={handleViewChange}
      />

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg p-4 w-full max-w-xs">
            <div className="font-semibold text-yellow-300 mb-2">{selectedEvent.title}</div>
            <div className="text-sm">Title: <span className="text-gray-200">{selectedEvent.data.diseaseTitle}</span></div>
            <div className="text-sm">Status: <span className="text-gray-200">{selectedEvent.data.status}</span></div>
            <div className="text-sm">Comments: <span className="text-gray-400">{selectedEvent.data.comments || "None"}</span></div>
            <div className="text-sm">Cost: <span className="text-green-400">₹{selectedEvent.data.cost || 0}</span></div>
            <button 
              onClick={() => setSelectedEvent(null)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


function renderEventContent(eventInfo) {
  const [name, title] = eventInfo.event.title.split(' - ');

  return (
    <div 
      className="flex flex-col text-xs px-1 py-0.5 rounded border border-white"
      style={{ 
        backgroundColor: eventInfo.event.backgroundColor || eventInfo.event.extendedProps.color || '#16a34a',
        color: 'white',
        lineHeight: '1.1',
        overflow: 'hidden',
        whiteSpace: 'normal',
        textOverflow: 'ellipsis',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRadius: '4px',
        padding: '0px 4px',
      }}
    >
      <span className="font-semibold">{name}</span>
      <span>{title}</span>
    </div>
  );
}
