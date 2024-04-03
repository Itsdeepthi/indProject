import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const { userId } = useParams();
  const role = location.state ? location.state.role : '';
  console.log(userId);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>{role === 'user' ? 'Hello User' : 'Hello Admin'}</h1>
      </header>
          {
        role === 'user' ? <>
          <Link to={`/registerevent/${userId}`}>
                  <button>Register</button> </Link> </>: 
                  <>
                      <Link to={`/createevent`}>
                          <button>Events</button>
                      </Link>
                      <Link to={`/create`}>
                          <button>Users</button>
                    </Link>
                  </>
      }
    </div>
  );
}

export default Dashboard;

