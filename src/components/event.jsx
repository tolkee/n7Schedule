import React from 'react';
import { DateTime } from 'luxon';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Event = (event) => {
  const {
    SUMMARY, LOCATION, DTSTART, DTEND, type, course,
  } = event.event;
  return (
    <Wrapper>
      <span style={{ color: '#ecefbd', fontWeight: '700', marginRight: '10px' }}>
        {`${DateTime.fromISO(DTSTART).toFormat('HH:mm')} - ${DateTime.fromISO(DTEND).toFormat('HH:mm')}`}
      </span>
      <span style={{ color: '#d9a037', fontWeight: '700', marginRight: '10px' }}>
[
        {type}
]
      </span>
      <span style={{ color: 'orange', fontWeight: '900' }}>{LOCATION}</span>
      <span style={{ marginRight: '10px', color: 'white' }}>{course}</span>
    </Wrapper>
  );
};

export default Event;
