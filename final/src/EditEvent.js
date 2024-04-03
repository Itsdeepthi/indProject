import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditEvent() {
  const [title, settitle] = useState("");
  const [domain, setdomain] = useState("");
  const [date, setdate] = useState("");
  const [duration, setduration] = useState("");
  const [trainerName, settrainerName] = useState("");
  const [location, setlocation] = useState("");
  const [desc, setdesc] = useState("");
  
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleFetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/fetch-event/${eventId}`);
        const eventData = response.data;

        settitle(eventData.title);
        setdomain(eventData.domain);
        setdate(new Date(eventData.date).toISOString().split('T')[0]); // format date
        setduration(eventData.duration);
        settrainerName(eventData.trainerName);
        setlocation(eventData.location);
        setdesc(eventData.desc);

      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    handleFetchEvent();
  }, [eventId]);

 const handleUpdate = async (e) => {
  e.preventDefault();
   try {
     console.log("Before axios");
    const response = await axios.post(`http://localhost:5000/editevent/${eventId}`, {
      title,
      domain,
      date,
      duration,
      trainerName,
      location,
      desc
    });
     
     console.log("After axios");
     console.log(response);

    if (response.status === 200) {
      alert('Updated successfully');
      navigate('/createevent'); 
    } else {
      alert('Update failed');
    }
  } catch (error) {
    console.error('Error updating:', error);
  }
};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Edit Event</h1>
      </header>
      <form className="user-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={e => settitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="domain">Domain:</label>
          <input
            type="text"
            id="domain"
            name="domain"
            value={domain}
            onChange={e => setdomain(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={e => setdate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={duration}
            onChange={e => setduration(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="trainerName">Trainer Name:</label>
          <input
            type="text"
            id="trainerName"
            name="trainerName"
            value={trainerName}
            onChange={e => settrainerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={e => setlocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={desc}
            onChange={e => setdesc(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={(e) => handleUpdate(e)}>Update</button>
      </form>
    </div>
  );
}

export default EditEvent;
