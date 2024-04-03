import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function CreateEvent() {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [buttonStates, setButtonStates] = useState({});

  const { userId } = useParams();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/displayevents');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/currentuser/${userId}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/registeredevents/${userId}`);
        setRegisteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };

    fetchEvents();
    fetchCurrentUser();
    fetchRegisteredEvents();
  }, [userId]);

  const handleAccept = async (eventId) => {
    if (isEventRegistered(eventId)) {
      alert('Already registered for this event');
      console.log('Already registered for this event');
      return;
    }
    
    try {
      const response = await axios.post(`http://localhost:5000/acceptevent/${eventId}`, {
        userId: userId,
      });
      
      if (response.status === 200) {
        alert('Event accepted successfully');
        setRegisteredEvents([...registeredEvents, eventId]);
        setButtonStates({ ...buttonStates, [eventId]: true });
      } else {
        console.log('Acceptance failed');
      }
    } catch (error) {
      console.error('Error accepting event:', error);
    }
  };

  const isEventRegistered = (eventId) => {
    return registeredEvents.includes(eventId);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Register Event</h1>
        <Link to={`/registerevent/${userId}/display`}>
          <button>View registered events</button>
        </Link>
      </header>
      
      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h3>{event.title}</h3>
            <p><strong>Domain:</strong> {event.domain}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Duration:</strong> {event.duration}</p>
            <p><strong>Trainer Name:</strong> {event.trainerName}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.desc}</p>
            <p><strong>Capacity:</strong> {event.capacity}</p>
            
            <button 
              onClick={() => {
                handleAccept(event._id);
              }} 
              disabled={isEventRegistered(event._id) || buttonStates[event._id]}
            >
              {buttonStates[event._id] ? 'Accepted' : 'Accept'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateEvent;
