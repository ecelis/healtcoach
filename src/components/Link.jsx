import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
color: ${props => props.invert ? "#6667ab" : "whitesmoke"};
background: ${props => props.invert ? "whitesmoke" : "#6667ab"};
text-decoration: none;
`;