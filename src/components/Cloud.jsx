import React from 'react';
import styled from 'styled-components';

const Cloud = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default function StyledUl (props) {
    return(
        <Cloud>{props.children}</Cloud>
    );
}
