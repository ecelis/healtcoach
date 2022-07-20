import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
height: ${props => props.height ? props.height : 106}px;
overflow: auto;
`;

export default function StyledContainer(props) {
    return (
        <Div>{props.children}</Div>
    );
}
