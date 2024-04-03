import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Login from './Login';
import Create from './Create';
import Changepass from './Changepass';
import Event from './Event';
import EditEvent from './EditEvent';
import DeleteEvent from './DeleteEvent'; 
import RegisterEvent from './RegisterEvent';
import LandingPage from './LandingPage';
import DisplayRegisteredEvents from './DisplayRegEvents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/changepassword" element={<Changepass />} />
        <Route path="/createevent" element={<Event />} />
        <Route path="/editevent/:eventId" element={<EditEvent />} />
        <Route path="/deleteevent/:eventId" element={<DeleteEvent />} />
        <Route path="/landing/:userId" element={<LandingPage />} />
        <Route path="/registerevent/:userId" element={<RegisterEvent />} />
        <Route path="/registerevent/:userId/display" element={<DisplayRegisteredEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
