import React, { useState, useEffect } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SignIn from './components/Signin';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  // eslint-disable-next-line
  const [params,setSearchParms] = useSearchParams();
  
  useEffect(() => {
    function checkStatus() {
      const token = params.get('token');
      if (token) {
        axios.get(`${process.env.REACT_APP_APIURL}/login/callback?token=${token}`, {}, {
          headers: { 'Content-Type': 'application/json'}
        })
          .then(res =>{
              const user = res.data;
              setUser(user);
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('token', token);
          })
          .catch(error => {
            localStorage.clear();
          });
      } else {  // TODO validate localStorage token expiration
        const prevToken = localStorage.getItem('token');
        if(prevToken) {
          axios.get(`${process.env.REACT_APP_APIURL}/login/callback?token=${prevToken}`, {}, {
            headers: { 'Content-Type': 'application/json'}
          })
            .then(res =>{
                const user = res.data;
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', prevToken);
            })
            .catch(error => {
              localStorage.clear();  // clean up
            });
        }
      }
    }
    checkStatus();
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps
  // Above es-lint-disable rule is required to avoid useEffect WARNING
  // that breaks Github Actions

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
