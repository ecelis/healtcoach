import React from 'react';
import styled from 'styled-components';
import { StyledLink } from './Link';

export const H1 = styled.h1`
  text-align: center;
`;
  
export const StyledLi = styled.li`
    list-style: none;
    border-left: thin solid whitesmoke;
    border-right: thin solid whitesmoke;
    padding-left: 6px;
    padding-right: 6px;
`;

const StyledNavbar = styled.div`
    display: flex;
    align-items: center;padding: 6px;
`;

const StyledUlNav = styled.ul`
list-style: none;
padding-left: 0;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
`;

export function StyledH1(props) {
    return (<h1><StyledLink to={props.to}>{props.children}</StyledLink></h1>);
}

export default function Navigation(props) {
    const items = ['Menu', 'Recipe']
    return (
      <StyledNavbar><StyledUlNav>
        {
          items.map(i => {return (<StyledLi key={i}><StyledLink to='/recipe'>{i}</StyledLink></StyledLi>)})
        }
      </StyledUlNav></StyledNavbar>
    );
  }
