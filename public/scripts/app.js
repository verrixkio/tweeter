$(document).ready(function() {/*
  * Client-side JS logic goes here
  * jQuery is already loaded
  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
  */
 console.log('ready for work')

  // Test / driver code (temporary). Eventually will get this from the server.

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
                <img class="profile-pic" src="${escape(profilePic)}"</img>
                <span class="profile-name">${escape(tweetUserName)}</span>
                <span class="user-handle">${escape(handle)}</span>
              </header>
              <div>
                <span class="tweet">${escape(tweetContent)}</span>
              </div>
              <footer>
                <span class="date">${escape(tweetDate)}</span>
              </footer>
      </article>
    
    `)

    
  }
  function renderTweets(tweets) {
    //Create the article
    $('<article>').addClass('tweet');
    // loops through tweets
    for (tweet in tweets) {
      
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweets[tweet])
      // takes return value and appends it to the tweets container
      $('.tweet-container').prepend($tweet);
    }
  }

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
      //Form Validation logic. 
      // Need to check the character count.

      //This wont work because we dont have the character set
      // const charCount = 
      const characterLogic = ($('.container .new-tweet form .counter').text())
      charCheck = Number(characterLogic)
      if (charCheck === 140) {
        console.log("true")
        alert("Please twitter tweet some tweety tweets!")
      } else if (charCheck < 0) {
        alert("Too many Characters")
      } else {
  
        $.ajax('/tweets', { method: 'GET'})
        .then(function (posttweets) {
          console.log('Success: ', posttweets);
          renderTweets(posttweets)
          //Reset the char count
          $('.container .new-tweet form textarea').val('')
          $('.container .new-tweet form .counter').text('140')
          
          
        });
      }
    });
  }
  render()
});








