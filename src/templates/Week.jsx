/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import Event from '../components/Event';
import Layout from '../components/Layout';
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
  const [currentDate, setCurrentDate] = useState(0);

  useEffect(() => {
    setCurrentDate(DateTime.local());
  }, []);

  return (
    <Layout week={week} updated={updated} year={year}>
      {Array.from(weekEvents, ([day, dayEvents], i) => (
        <Card key={i}>
          <CardHeader>
            <span style={{ fontSize: '22px', fontWeight: '500', color: 'white' }}>
              {day}
            </span>
            <FlexSeparator />
            {DateTime.fromISO(dayEvents[0].DTSTART).hasSame(currentDate, 'day') && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className="material-icons" style={{ color: 'green' }}>
                  today
                </i>
                <span style={{ fontWeight: '600', color: 'green' }}>TODAY</span>
              </div>
            )}

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
