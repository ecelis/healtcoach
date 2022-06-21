import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Signin from './components/Signin';
import Calendar from './components/Calendar';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="container">
      <Header
      user={user} />
      <div className='wrapper'>
        { user ? <Calendar user={user} /> : <Signin /> }
      </div>
    </div>
  );
}

export default App;
