import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledPill } from "./Button";
import {
  DateGrid,
  DayOfWeek,
  MonthIndicator
} from './Grid';

function getFirstOfMonth(year, month) {
  return (new Date(year, month)).getDay();
}

function getLastOfMonth(year, month) {
  return 32 - new Date(year, month, 32).getDate();
}

function getCurrent() {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    first: getFirstOfMonth(date.getFullYear(), date.getMonth()),
    last: getLastOfMonth(date.getFullYear(), date.getMonth()),
    date: date.toLocaleDateString()
  }
}

const CalendarWrapper = styled.div`
  max-width: max-content;
  margin: 3em auto 0 auto;
  padding: 1.5em;
  background-color: #fff;
  border: 2px solid var(--blue-grey-200);
  border-radius: 8px;
}
`;

const Days = function(props) {
  const a = [];
  for(let i = props.current.first; i <= props.current.last; i++ ) {
    a.push(i); 
  }
  console.log('aaray', a)
  return (
    a.map(item => {
      return (
        <div key={item}><time dateTime={`${props.current.year}-${props.current.month}-${item}`}>{item}</time></div>
      )
    })
      
  )
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(getCurrent());

  return (
    <div>
      <StyledPill
      id="newMenuButton"
      to={"/menu/new"}
      link={true}>
        <span role="img">{String.fromCodePoint('0x2795')}</span> New Menu
      </StyledPill>
      <div>{currentDate.date}</div>
      <CalendarWrapper>
        <MonthIndicator>
          <time dateTime={`${currentDate.year}-${currentDate.month}`}>{`${currentDate.year} ${currentDate.month}`}</time>
        </MonthIndicator>
        <DayOfWeek>
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </DayOfWeek>
        <DateGrid>
          <Days current={currentDate} />
        </DateGrid>
      </CalendarWrapper>
    </div>
  );
}
  