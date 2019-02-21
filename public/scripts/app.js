$(document).ready(function() {/*
  * Client-side JS logic goes here
  * jQuery is already loaded
  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
  */
 console.log('ready for work')

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  //First thing i need to do is learn how to post something to the dom.
  //Lets start with building a basic container on the dom
    //Wrong dom edits and appends

  //Lets get the info from the tweetData
  //Okay we need small profile picture
  const profilePic = tweetData.user.avatars.small
  //Username
  const tweetUserName = tweetData.user.name
  //Handle
  const handle = tweetData.user.handle
  //date
  const tweetDate = tweetData.created_at
  //tweet
  const tweetContent = tweetData.content

  // start by adding the username too...
    //path = 
  $('.container article header .profile-name').text(tweetUserName)
  // I need to create this element via a path structure.
  

});






