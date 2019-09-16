/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import Event from '../components/event';
import Layout from '../components/layout';
import Card from '../components/Card';
import { formatEvents } from '../utils';
import FlexSeparator from '../components/FlexSeparator';

const CardHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Week = ({ pathContext: { week, year, updated }, data }) => {
  const weekEvents = formatEvents(data);
  const [date, setDate] = useState(0);

  useEffect(() => {
    setDate(DateTime.local());
  }, []);

  return (
    <Layout week={week}>
      {Array.from(weekEvents, ([day, dayEvents], i) => (
        <Card key={i}>
          <CardHeader>
            <span style={{ fontSize: '24px', fontWeight: '600', color: 'white' }}>
              {day}
,
            </span>
            <span style={{
              fontSize: '17x', fontWeight: '300', color: 'white', marginLeft: '5px',
            }}
            >
              {DateTime.fromISO(dayEvents[0].DTSTART).toFormat('dd LLLL')}
            </span>
            <FlexSeparator />
            {DateTime.fromISO(dayEvents[0].DTSTART).hasSame(date, 'day') && <span style={{ fontWeight: '600', color: 'green' }}>TODAY</span>}
          </CardHeader>
          {dayEvents.map((event, index) => (
            <Event key={index} event={event} />
          ))}
        </Card>
      ))}
    </Layout>
  );
};


export const query = graphql`
    query weekEvents($year: Int!, $week: Int!) {
        allCalendarJson(filter: { week: { eq: $week }, year: { eq: $year } }, sort: { fields: [DTSTART, DTEND] }) {
            edges {
                node {
                    DTSTART
                    DTEND
                    DESCRIPTION
                    LOCATION
                    SUMMARY
                    year
                    week
                }
            }
        }
    }
`;

export default Week;
