/* eslint-disable import/prefer-default-export */
const { DateTime } = require('luxon');

export const formatEvents = (data) => {
  const eventMap = new Map();
  const events = data.allCalendarJson.edges.map(({ node }) => node);
  events.forEach((event) => {
    const eventDay = DateTime.fromISO(event.DTSTART).toLocaleString({ weekday: 'long', month: 'short', day: '2-digit' });
    ['APP1A', 'SN', 'MF2E'].forEach((el) => {
      event.SUMMARY = event.SUMMARY.replace(el, '');
    });
    if (event.SUMMARY.includes('-')) {
      const summary = event.SUMMARY.split('-');
      event.id = summary[0];
      if ((event.SUMMARY.split('-').length - 1) === 2) {
        event.type = summary[1] && summary[1].trim();
        event.course = summary[2] && summary[2].trim();
      } else {
        event.course = summary[1] && summary[1].trim();
      }
    } else {
      const summary = event.SUMMARY.split(' ');
      event.id = summary[0];
      event.type = summary[1] && summary[1].trim();
      event.course = summary[2] && summary[2].trim();
    }
    if (!eventMap.has(eventDay)) {
      eventMap.set(eventDay, [event]);
    } else {
      eventMap.get(eventDay).push(event);
    }
  });
  return eventMap;
};
