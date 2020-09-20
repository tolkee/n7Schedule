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

const REMOTE_URL = 'https://edt.inp-toulouse.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=187&projectId=46&calType=ical&firstDate=2020-08-01&lastDate=2021-07-15';

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
  const text = await getIcal(false);

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
  const updated = actualDate.plus({ hours: 2 }).toFormat('dd LLL yyyy, HH:mm:ss');

  years.forEach((year) => {
    for (let week = 1; week <= 53; week++) {
      createPage({
        path: `/${year}/${week}`,
        component: weekTemplate,
        context: {
          year,
          week,
          updated,
        },
      });
    }
  });
};
