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

function Navigation(props) {
  const items = ['Recipes']
  return (
    <div><ul>
      {
        items.map(i => {return (<li key={i}><Link to='/recipe'>{i}</Link></li>)})
      }
    </ul></div>
  );
}

export default function Header(props) {
    const { user } = props;
    return (
      <div className="header">
        <h1><Link to={'/'}>Web Health Coach</Link></h1>
        { user ?
        <div>
          <Badge displayName={user.displayName} setUser={props.setUser} />
          <Navigation />
        </div>
        : null }
      </div>
    );
  }
