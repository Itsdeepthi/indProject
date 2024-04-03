import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DisplayRegisteredEvents() {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/registeredevents/${userId}/display`);
        //  console.log(response)
           console.log(response.data[0].eventId)
        setRegisteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };

    fetchRegisteredEvents();
  }, [userId]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Registered Events</h1>
      </header>
      
      <div className="events-list">
        {registeredEvents.map((event, index) => (
          <div key={index} className="event-card">
            <p><strong>Title:</strong><h3>{event.eventId.title}</h3></p>
            <p><strong>Domain:</strong> {event.eventId.domain}</p>
            <p><strong>Date:</strong> {event.eventId.date}</p>
            <p><strong>Duration:</strong> {event.eventId.duration}</p>
            <p><strong>Trainer Name:</strong> {event.eventId.trainerName}</p>
            <p><strong>Location:</strong> {event.eventId.location}</p>
                <p><strong>Description:</strong> {event.eventId.desc}</p>
                <p><strong>-------------</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayRegisteredEvents;
