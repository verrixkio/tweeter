"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {


  //Get the tweets. This is where we will need to access our database.
  tweetsRoutes.get("/", function(req, res) {
    //Accesses the datahelpers with a function. Datahelps was passed in where we get the tweets.
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        //Responds with a json tweets to the / page.
        res.json(tweets);
      }
    });
  });
  
  //Create a new tweet. Post the Tweets we recieve from the database.
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    // Generate Random user
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    // Create the actual tweet object.
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    // The action that actually saves the tweet has error logic to check if it worked.
    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(tweet);
      }
    });
  });
  return tweetsRoutes;
}
