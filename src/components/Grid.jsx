import styled from "styled-components";

export const Grid = styled.div``;

export const Row = styled.div`
    display: flex;
    ${props => 
        {
            if(props.hoverColor) {
                return `&:hover {
                    background: #6667ab4f;
                    transition: all 180ms ease-in-out;
                }`
            }
        }
    };
    
`;

const media = {
    xs: (styles) => `
    @media only screen and (max-width: 480px) {
        ${styles}
    }`
}

export const Col = styled.div`
    flex: ${(props) => props.size};
    ${(props) => props.collapse && media[props.collapse](`
    display: none;
    text-align: ${props.align};
    `)}
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DateGrid = styled(CalendarGrid)`
  margin-top: 0.5em;
  border: 0.5px solid var(--blue-grey-200);
  //border-bottom: 1px solid var(--blue-grey-200);
  
  /* Positioning the first day */
  div:first-child {
    grid-column: 6;
  }

  // Style for each day
  div {
    grid-auto-rows: 100px;
    text-align: right;
    position: relative;
    border: 0.5px solid var(--blue-grey-200);
    //border-top: 1px solid var(--blue-grey-200);
    width: 4.5ch;
    height: 4.5ch;
    background-color: transparent;
    color: var(--blue-grey-600);
  }

  div:hover,
  div:focus {
    outline: none;
    background-color: var(--blue-grey-050);
    color: var(--blue-grey-700);
  }

  div:active,
  div.is-selected {
    background-color: var(--teal-100);
    color: var(--teal-900);
  }

`;

export const DayOfWeek = styled(CalendarGrid)`
  margin-top: 1.25em;
  > * {
    font-size: 0.7em;
    color: var(--blue-grey-400);
    font-weight: 500;
    letter-spacing: 0.1em;
    font-variant: small-caps;
    text-align: center;
  }  
`;

export const MonthIndicator = styled.div`
  color: var(--blue-grey-700);
  text-align: center;
  font-weight: 500;
`;
