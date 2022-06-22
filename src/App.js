import React, { useState, useEffect } from 'react';
import './App.css';
import { useSearchParams, Outlet } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/Signin';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [searchParams,setSearchParms] = useSearchParams();  // eslint-disable-line
  /* eslint-disable no-debugger, no-console */
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      axios.get(`${process.env.REACT_APP_APIURL}/login/callback?token=${token}`, {}, {
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
        axios.get(`${process.env.REACT_APP_APIURL}/login/callback?token=${token}`, {}, {
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
  /* eslint-disable no-debugger, no-console */

  return (
    <div className="container">
      <Header
      user={user}
      setUser={setUser} />
      <div className='wrapper'>
        { user ? <Outlet /> : <SignIn /> }
      </div>
    </div>
  );
}

export default App;
