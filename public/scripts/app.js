$(document).ready(function() {/*
  * Client-side JS logic goes here
  * jQuery is already loaded
  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
  */
 $(".container .new-tweet").hide()
 $(".container .error .errorPrompt").hide();
 
 

  // Test / driver code (temporary). Eventually will get this from the server.

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweetInfo) {
 
    const profilePic = tweetInfo.user.avatars.small
    const tweetUserName = tweetInfo.user.name
    const handle = tweetInfo.user.handle
    const tweetDatesec = tweetInfo.created_at
    function toDateTime(secs) {
      var t = new Date(1970, 0, 1); // Epoch
      t.setSeconds(secs);
      return t;
  }
    const tweetDate = toDateTime(tweetDatesec);

    const tweetContent = tweetInfo.content.text
    return (`
      <article class="tweet">
              <header>
                <img class="profile-pic" src="${profilePic}"</img>
                <span class="profile-name">${escape(tweetUserName)}</span>
                <span class="user-handle">${escape(handle)}</span>
              </header>
              <div>
                <span class="tweet">${escape(tweetContent)}</span>
              </div>
              <footer>
                <span class="date">${tweetDate}</span>
                <i class="fas fa-heart"></i>
                <i class="fas fa-flag"></i>
                <i class="fas fa-share"></i>
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
  // Setting up the submit event caller on the form-tweet
  var $form = $('#form-tweet');
  let count = 0
  $form.on('submit', function (event) {
    console.log('Button clicked, performing ajax call...');
    count++
    event.preventDefault()
    const serialtweet = $(this).serialize()
    const characterLogic = ($('.container .new-tweet form .counter').text())
      
      charCheck = Number(characterLogic)
      if (charCheck === 140 && count === 1) {
        $(".container .error .errorPrompt").slideToggle(300);

      } else if (charCheck === 140 && count > 0) {

      } else if (charCheck < 0) {
        $(".container .error .errorPrompt").slideToggle(300);
      } else {
        $(".container .error .errorPrompt").hide();
        $.ajax('/tweets', { method: 'POST', data: serialtweet, 
          success: function(tweeter) {  
            newtweet = createTweetElement(tweeter)
            $('.tweet-container').prepend(newtweet);
            // renderTweets(serialtweet)   
          }
        });
          $('.container .new-tweet form textarea').val('')
          $('.container .new-tweet form .counter').text('140') 
          count = 0
      }     
  });
  
  //Load Tweets Function Fetching form the /tweets page

  // It will use Jquery to make a request to /tweets and receieve the array of tweets as JSON
  //This function successfully returns tweets
  function loadTweets(data) {
      $.ajax('/tweets', { method: 'GET'})
          //How do i access the information
          .then(function (posttweets) {
            renderTweets(posttweets);  
          });
        }; 
  loadTweets()
  
  // Generating Compose listen and slide event.
    //Toggle Down the new-tweet prompt.
  $( "#nav-bar .btn").click(function(event) {
    $(".container .new-tweet ").slideToggle(300);
    $(".container .new-tweet form textarea").focus();
  });
});








