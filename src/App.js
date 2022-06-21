import React, { useState, useEffect } from 'react';
import './App.css';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/Signin';
import Calendar from './components/Calendar';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      axios.get('/login/callback?token=' + token, {}, {
        headers: { 'Content-Type': 'application/json'}
      })
        .then(res =>{
            const user = res.data;
            setUser(user);
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('token', token);
        })
        .catch(error => {
          sessionStorage.clear();
        });
    } else {  // TODO validate sessionStorage token expiration
      const prevToken = sessionStorage.getItem('token');
      if(prevToken) {
        axios.get('/login/callback?token=' + prevToken, {}, {
          headers: { 'Content-Type': 'application/json'}
        })
          .then(res =>{
              const user = res.data;
              setUser(user);
              sessionStorage.setItem('user', JSON.stringify(user));
              sessionStorage.setItem('token', prevToken);
          })
          .catch(error => {
            sessionStorage.clear();  // clean up
          });
      }
    }
  }, []);

  return (
    <div className="container">
      <Header
      user={user}
      setUser={setUser} />
      <div className='wrapper'>
        { user ? <Calendar user={user} /> : <SignIn /> }
      </div>
    </div>
  );
}

export default App;
