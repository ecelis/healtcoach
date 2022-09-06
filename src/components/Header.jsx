import React from 'react';
import { StyledLink } from './Link';
import Navigation, { StyledH1 } from './Navbar';

function Badge(props) {
  return (
    <div>
      <span>{props.displayName}</span>
      {' '}
      [<StyledLink invert="true" to={'/'}
      onClick={() => {
        props.setUser(null); sessionStorage.clear();
      }}>Log Out</StyledLink>]
    </div>
  );
}

export default function Header(props) {
    const { user } = props;
    return (
      <div className="header">
        <StyledH1 to={'/'}>Web Health Coach</StyledH1>
        { user ?
        <div>
          <Badge displayName={user.displayName} setUser={props.setUser} />
          <Navigation />
        </div>
        : null }
      </div>
    );
  }
