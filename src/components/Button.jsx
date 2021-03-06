import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "#6667ab" : "whitesmoke"};
  color: ${props => props.primary ? "whitesmoke" : "#6667ab"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #6667ab;
  border-radius: 3px;
`;

export default function StyledButton (props) {
    const {text, primary} = props;
    return(
    <div>
        <Button primary={primary}>{text}</Button>
    </div>
    );
}

const Pill = styled.a`
display: inline-block;
border-radius: 3px;
padding: 3px;
margin: 3px;
width: 5rem;
background: #6667ab;
background: ${props => props.selected ? "#6667ab" : "lightgrey"};
color: ${props => props.selected ? "whitesmoke" : "#6667ab"};
border: ${props => props.selected ? "thin solid #6667ab" : "thin solid grey"};
border-radius: 32px;
font-size: 12px;
text-align: center;
text-decoration: none;
`;

export function StyledPill (props) {
  return (
    <Pill onClick={props.onClick} id={props.itemId}
      href={`${props.itemType},${props.itemId}`}
      selected={props.selected}>
      {props.children}</Pill>
  );
}