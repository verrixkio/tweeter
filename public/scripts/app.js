$(document).ready(function() {/*
  * Client-side JS logic goes here
  * jQuery is already loaded
  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
  */
 console.log('ready for work')

  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
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
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function createTweetElement(tweetInfo) {
 
      //Okay we need small profile picture
    const profilePic = tweetInfo.user.avatars.small
    //Username
    const tweetUserName = tweetInfo.user.name
    console.log(tweetUserName)
    //Handle
    const handle = tweetInfo.user.handle
    //date
    const tweetDate = tweetInfo.created_at
    //tweet
    const tweetContent = tweetInfo.content.text
    return (`
      <article class="tweet">
              <header>
                <img class="profile-pic" src="${profilePic}"</img>
                <span class="profile-name">${tweetUserName}</span>
                <span class="user-handle">${handle}</span>
              </header>
              <div>
                <span class="tweet">${tweetContent}</span>
              </div>
              <footer>
                <span class="date">${tweetDate}</span>
              </footer>
      </article>
    
    `)

    
  }
  function renderTweets(tweets) {
    // loops through tweets
    for (tweet in tweets) {
      
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweets[tweet])
      // takes return value and appends it to the tweets container
      $('.container').append($tweet);
    }
  }
  // renderTweets(data);

  var $form = $('#form-tweet');
  $form.on('submit', function (event) {
    console.log('Button clicked, performing ajax call...');
    event.preventDefault()
    const serialtweet = $(this).serialize()
    $.ajax('/tweets', { method: 'POST', data: serialtweet })
      console.log(serialtweet)
    //.then(function (tweetAsync) {
      //console.log(serialtweet)
      //$button.replaceWith(morePostsHtml);
    });

  //Load Tweets Function Fetching form the /tweets page

  // It will use Jquery to make a request to /tweets and receieve the array of tweets as JSON
  const render = function loadTweets() {
    var $form = $('#form-tweet');
    $form.on('submit', function () {
      console.log('Button clicked, performing ajax call...');
      $.ajax('/tweets', { method: 'GET'})
      .then(function (posttweets) {
        console.log('Success: ', posttweets);
        renderTweets(posttweets)
      });
    });
  }
  render()
});

// });






