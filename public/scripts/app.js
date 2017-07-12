$(document).ready(function() {

  //These three functions create the header, body and footer of the tweet
  //they were taken out of the createTweetElement for readability,
  //and to create more intuitive level of abstraction in the createTweetElement function
  function createTweetHeader (tweetData) {
    var $header = $("<header>")
      .append($("<img class='avatar' src='" + tweetData.user.avatars.small + "'>"))
      .append($("<h1>").text(tweetData.user.name))
      .append($("<h2>").text(tweetData.user.handle))
    return $header;
  }

  function createTweetBody (tweetData) {
    var $body = $("<p>").text(tweetData.content.text)
    return $body;
  }

  function createTweetFooter (tweetData) {
    var $footer = $("<footer>")
      .append($("<h3>").text(tweetData.created_at))
      .append($("<span class='icons'>")
        .append($("<img class='flag' src='/images/flag.png'>"))
        .append($("<img class='retweet' src='/images/retweet.png'>"))
        .append($("<img class='like' src='/images/like.png'>")))
    return $footer;
  }






  //takes in a single tweetData object
  //calls functions for header, body, footer, and appends them to the article tweet
  //reduced to function calls to make the structure/content of the appends more intelligible
  function createTweetElement (tweetData) {
    var $tweet = $("<article class='tweet'>")
      .append(createTweetHeader(tweetData))
      .append(createTweetBody(tweetData))
      .append(createTweetFooter(tweetData));

    return $tweet;
  };




  //takes in "tweets" (an array of objects each containing tweet info)
  //iterates through "tweets" calling createTweetElement for each given object in the array
  //appends each of the final results of createTweetElement to the DOM
  function renderTweets (tweets) {
    tweets.forEach(function(tweetObj) {
      var tweet = createTweetElement(tweetObj);
      $("#tweets-container").append(tweet);
    })
  };
});












