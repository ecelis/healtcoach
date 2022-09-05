import React from 'react';
import { Link } from 'react-router-dom';
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
  &:active {
    transition: all 180ms ease-in-out;
    background: ${props => props.primary ? "whitesmoke" : "#6667ab"};
    color: ${props => props.primary ? "#6667ab" : "whitesmoke"};
  }
  &:hover {
    transition: all 180ms linear;
  }
`;

export default function StyledButton (props) {
    const {text, primary} = props;
    return(
    <div>
        <Button primary={primary}>{text}</Button>
    </div>
    );
}

const Pill = styled(Link)`
display: inline-block;
border-radius: 3px;
padding: 3px;
margin: 3px;
width: 5rem;
background: ${props => props.selected ? "#6667ab" : "lightgrey"};
color: ${props => props.selected ? "whitesmoke" : "#6667ab"};
border: ${props => props.selected ? "thin solid #6667ab" : "thin solid grey"};
border-radius: 32px;
font-size: 12px;
text-align: center;
text-decoration: none;
&:active {
  transition: all 180ms ease-in-out;
  background: ${props => props.primary ? "whitesmoke" : "#6667ab"};
  color: ${props => props.primary ? "#6667ab" : "whitesmoke"};
}
&:hover {
  background: ${props => props.primary ? "whitesmoke" : "#6667ab"};
  color: ${props => props.primary ? "#6667ab" : "whitesmoke"};
}
`;

export function StyledPill (props) {
  return (
    <Pill onClick={props.onClick} id={props.itemId}
      to={props.link ? `${props.to}` : `${props.itemType},${props.itemId}`}
      selected={props.selected}>
      {props.children}</Pill>
  );
}

const StyledSpanButton = styled.span`
  display: inline-block;
  padding: 3px;
  margin: 3px;
  &:hover { cursor: pointer; }  
`;
export function TrashButton (props) {
  return (
    <StyledSpanButton role="image" name="delete"
    id={props.id}
    onClick={props.handler}>{String.fromCodePoint('0x1F5D1')}</StyledSpanButton>
  )
}
export function EditButton (props) {
  return (
    <StyledSpanButton role="image" name="edit"
    id={props.id}
    onClick={props.handler}>{String.fromCodePoint('0x1F4dd')}</StyledSpanButton>
  )
}
export function AddButton (props) {
  return (
    <StyledSpanButton role="image" name="edit"
    id={props.id}
    onClick={props.handler}>{String.fromCodePoint('0x2705')}</StyledSpanButton>
  )
}