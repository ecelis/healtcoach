import React from 'react';
import { Link } from 'react-router-dom';

function Badge(props) {
  return (
    <div>
      <span>{props.displayName}</span>
      [<Link to={'/'} onClick={() => { props.setUser(null); sessionStorage.clear(); }}>Log Out</Link>]
    </div>
  );
}

export default function Header(props) {
    const { user } = props;
    return (
      <div className="header">
        <h1>Web Health Coach</h1>
        { user ? <Badge displayName={user.displayName} setUser={props.setUser} /> : null }
      </div>
    );
  }
