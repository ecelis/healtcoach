import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "#6667ab" : "white"};
  color: ${props => props.primary ? "white" : "#6667ab"};

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