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
    LOCATION, DTSTART, DTEND, type, course,
  } = event.event;

  const getTypeColor = (eventType) => {
    const typeLower = eventType && eventType.toLowerCase();
    if (typeLower.includes('exam')) {
      return 'red';
    } if (typeLower.includes('td')) {
      return '#FF5092';
    } if (typeLower.includes('tp')) {
      return '#8379F9';
    }
    return 'white';
  };

  return (
    <Wrapper>
      <span style={{ color: '#F7D36C', fontWeight: '700', marginRight: '10px' }}>
        {`${DateTime.fromISO(DTSTART).toFormat('HH:mm')} - ${DateTime.fromISO(DTEND).toFormat('HH:mm')}`}
      </span>
      <span style={{ color: `${type ? getTypeColor(type) : 'white'}`, fontWeight: '700', marginRight: '10px' }}>
        [
        {type}
        ]
      </span>
      <span style={{ color: 'orange', fontWeight: '900', marginRight: '10px' }}>{LOCATION}</span>
      <span style={{ marginRight: '10px', color: 'white' }}>{course}</span>
    </Wrapper>
  );
};

export default Event;
