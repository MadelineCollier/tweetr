$(document).ready(function() {

  /////////////////////////////////////
  ///                               ///
  ///   FUNCTIONS TO CREATE TWEETS  ///
  ///                               ///
  /////////////////////////////////////


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


  // works with the ^above^ 3 functions
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









  ////////////////////////////////////////////////////////////////
  ///                                                          ///
  ///   FUNCTIONS TO HANDLE "COMPOSE TWEET" FORM SUBMISSIONS   ///
  ///                                                          ///
  ////////////////////////////////////////////////////////////////




  //tiny function to ensure tweets are proper length/aren't empty
  //called in the handleNewTweet
  function validateTweet(tweetText) {
    if (tweetText.length > 140) {
      alert("Tweet is too long");
      return false;
    } else if (!tweetText){
      alert("Tweet cannot be empty");
      return false;
    } else {
      return true;
    }
  }


  //Handles form submission for the compose tweet section
  //Takes in form text, and posts it into the /tweets JSON object
  function handleNewTweet(event) {
    event.preventDefault();
    const $form = $(this);
    console.log($form.serialize());
    const formText = $form.find("textarea").val();
    console.log(formText);
    if (validateTweet(formText)) {
      $.ajax({
        type: "POST",
        url:  "/tweets",
        data: $form.serialize()
      })
        .done(console.log("ajax complete"));
    }
  }

  //event listener triggered when compose tweet form is submitted
  const $form = $("#create-tweet");
  $form.on("submit", handleNewTweet);










  /////////////////////////////////////
  ///                               ///
  ///   FUNCTIONS TO LOAD TWEETS    ///
  ///                               ///
  /////////////////////////////////////




  //iterates through "tweets" calling createTweetElement for each given object in the array
  //appends each of the final results of createTweetElement to the DOM
  function renderTweets (tweets) {
    tweets.forEach(function(tweetObj) {
      var tweet = createTweetElement(tweetObj);
      $("#tweets-container").prepend(tweet);
    })
  };


  //Loads any tweets present in the JSON object located at "/tweets"
  function loadTweets(){
    $.ajax("/tweets")
    .done(renderTweets);
  }

  loadTweets();

});












