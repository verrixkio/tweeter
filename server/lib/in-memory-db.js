"use strict";

// Requiring a JSON file automatically parses it and returns the data. These
// are just example tweets to make it less tedious to style the app initially.


//This may be where I need to require my database from!
const db = {
  tweets: require("../data-files/initial-tweets")
}

module.exports = db;

