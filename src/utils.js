/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
const { DateTime } = require('luxon');

export const formatEvents = (data) => {
  const eventMap = new Map();
  const events = data.allCalendarJson.edges.map(({ node }) => node);
  events.forEach((event) => {
    if (event.DTSTART === '20200302T130000Z') {
      console.log('-----------------------------hey');
    }
    const eventDay = DateTime.fromISO(event.DTSTART).toLocaleString({ weekday: 'long', month: 'short', day: '2-digit' });
    const summary = event.SUMMARY.split('-');
    event.id = summary[0];
    if (summary.length === 2) {
      event.course = summary[1];
    } else if (summary.length === 3) {
      event.type = summary[1];
      event.course = summary[2];
    } else if (summary.length === 4) {
      event.type = summary[1];
      event.course = summary[3];
    } else {
      event.course = event.SUMMARY;
    }
    let temp = event.course;
    ['APP', '1A', 'SN', 'MF2E'].forEach((el) => {
      temp = temp.replace(el, '');
    });
    event.course = temp;
    if (!eventMap.has(eventDay)) {
      eventMap.set(eventDay, [event]);
    } else {
      eventMap.get(eventDay).push(event);
    }
  });
  return eventMap;
};
