/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const axios = require('axios');
const ical2json = require('ical2json');
const fs = require('fs');


// Request the file ics, convert it to json and store it in data folder
exports.onPreBuild = () => {
    // empty /public folder
    console.log("----------- Request the ICAL");
    axios.get('https://calendar.google.com/calendar/ical/guillaume.lacoste65%40gmail.com/private-4580377d5b9948bdec093524a0ce9e59/basic.ics').then(
    function (response) {
        console.log("----------- No error on the request");
        const text = response.data; 
        console.log("----------- convert to JSON the ICAL");
        const json = ical2json.convert(text);
        console.log("----------- create JSON file");
        fs.writeFile("./src/data/calendar.json", JSON.stringify(json), 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    }
    )
    
};