/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

  var tweetData = {
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

  function createTweetElement (tweetObj) {
    var $tweet = $("<article>").addClass("tweet")
      .append($("<header>")
        .append($("<img class='avatar' src='" + tweetData.user.avatars.small + "'>"))
        .append($("<h1>").text(tweetData.user.name))
        .append($("<h2>").text(tweetData.user.handle))
      )
      .append($("<p>").text(tweetData.content.text))
      .append($("<footer>")
        .append($("<h3>").text(tweetData.created_at))
        .append($("<span>").addClass("icons")
          .append($("<img class='flag' src='/images/flag.png'>"))
          .append($("<img class='retweet' src='/images/retweet.png'>"))
          .append($("<img class='like' src='/images/like.png'>"))
        )
      )
    return $tweet;
  }

  var $tweet = createTweetElement(tweetData);


  $('#tweets-container').append($tweet);



});












