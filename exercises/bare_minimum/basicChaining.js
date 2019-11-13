/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var gitHub = require('./promisification');
var Promise = require('bluebird');
var db = Promise.promisifyAll(require('../../lib/db'));
var pc = require('./promiseConstructor');

var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  // TODO
  // return new Promise(function (resolve, reject) {
  //   console.log('first line ', pc.pluckFirstLineFromFileAsync(readFilePath));
  // })
  return pc.pluckFirstLineFromFileAsync(readFilePath)
    .then((firstLine) => {
      return gitHub.getGitHubProfileAsync(firstLine);
    })
    .then((body) => {

      fs.writeFileSync(writeFilePath, JSON.stringify(body), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Success');
        }
      });
    })
    .catch(function (error) {
      console.log('error is -----', error);
    });

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
