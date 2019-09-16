/* eslint-disable no-param-reassign */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const axios = require('axios');
const ical2json = require('ical2json');
const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');

const REMOTE_URL = 'https://calendar.google.com/calendar/ical/guillaume.lacoste65%40gmail.com/private-4580377d5b9948bdec093524a0ce9e59/basic.ics';

const getIcal = (local) => {
  if (local) {
    return new Promise((resolve, reject) => {
      fs.readFile('ADECal.ics', 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }
  return axios.get(REMOTE_URL).then((resp) => resp.data);
};

// Request the file ics, convert it to json and store it in data folder
exports.onPreBuild = async () => {
  // empty /public folder
  console.log('----------- Request the ICAL');
  const text = await getIcal(true);

  console.log('----------- convert to JSON the ICAL');
  const events = ical2json.convert(text).VCALENDAR[0].VEVENT;

  events.forEach((event) => {
    const eventDate = DateTime.fromISO(event.DTSTART);
    event.week = eventDate.weekNumber;
    event.year = eventDate.year;
  });

  console.log('----------- create JSON file');
  fs.writeFile('./src/data/calendar.json', JSON.stringify(events), 'utf8', (err) => {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    }
    console.log('JSON file has been saved.');
  });
};

exports.createPages = async ({ boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators;
  const weekTemplate = path.resolve('./src/templates/Week.jsx');

  const actualDate = DateTime.local();

  const years = [actualDate.year, actualDate.year + 1];

  years.forEach((year) => {
    for (let week = 0; week < 53; week++) {
      createPage({
        path: `/${year}/${week}`,
        component: weekTemplate,
        context: {
          year,
          week,
          updated: DateTime.local().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS),
        },
      });
    }
  });

  const now = DateTime.local();

  createRedirect({
    fromPath: '/',
    toPath: `/${now.weekYear}/${now.weekNumber}`,
  });
};
