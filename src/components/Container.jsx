import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
height: 106px;
overflow: auto;
`;

export default function StyledContainer(props) {
    return (
        <Div>{props.children}</Div>
    );
}
