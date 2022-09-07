import React from 'react';
import styled from 'styled-components';


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