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
          setUser(res.data);
        })
        .catch(error => {
          console.log('hubo pedo', error)
        });
    }
  }, []);

  return (
    <div className="container">
      <Header
      user={user} />
      <div className='wrapper'>
        { user ? <Calendar user={user} /> : <SignIn /> }
      </div>
    </div>
  );
}

export default App;
