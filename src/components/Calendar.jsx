import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledPill } from "./Button";
import {
  DateGrid,
  DayOfWeek,
  MonthIndicator
} from './Grid';

const CalendarWrapper = styled.div`
  max-width: max-content;
  margin: 3em auto 0 auto;
  padding: 1.5em;
  background-color: #fff;
  border: 2px solid var(--blue-grey-200);
  border-radius: 8px;
}
`;

export default function Calendar() {
  return (
    <div>
      <StyledPill
      id="newMenuButton"
      to={"/menu/new"}
      link={true}>
        <span role="img">{String.fromCodePoint('0x2795')}</span> New Menu
      </StyledPill>
      <CalendarWrapper>
        <MonthIndicator>
          <time datetime="2019-02"> February 2019 </time>
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
          <div><time dateTime="2019-02-01">1</time></div>
          <div><time dateTime="2019-02-02">2</time></div>
          <div><time dateTime="2019-02-03">3</time></div>
          <div><time dateTime="2019-02-28">28</time></div>
        </DateGrid>
      </CalendarWrapper>
    </div>
  );
}
  