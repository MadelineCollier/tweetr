$(() => {



  /////////////////////////////////////
  ///                               ///
  ///   FUNCTIONS TO CREATE TWEETS  ///
  ///                               ///
  /////////////////////////////////////


  //first off, a function to make the timestamp human readable
  //called below during the creation of the tweet footer
  const timeSince = (time) => {
    const now = Date.now();
    const elapsed = now - time;
    const diffMinutes = Math.floor((elapsed / 1000) / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays > 365) {
      return "A long time ago"
    } else if (diffHours > 23) {
      if (diffDays === 1) {
        return diffDays + " day ago";
      } else {
        return diffDays + " days ago";
      }
    } else if (diffMinutes > 59) {
      if (diffHours === 1) {
        return diffHours + " hour ago";
      } else {
        return diffHours + " hours ago";
      }
    } else {
      if (diffMinutes < 1) {
        return "Just now";
      } else if (diffMinutes === 1) {
        return diffMinutes + " minute ago";
      } else {
        return diffMinutes + " minutes ago";
      }
    }
  };

  //These three functions create the header, body and footer of the tweet
  //they were taken out of the createTweetElement for readability,
  //and to create more intuitive level of abstraction in the createTweetElement function
  const createTweetHeader = (tweetData) => {
    const $header = $("<header>")
      .append($("<img class='avatar' src='" + tweetData.user.avatars.small + "'>"))
      .append($("<h1>").text(tweetData.user.name))
      .append($("<h2>").text(tweetData.user.handle))
    return $header;
  };

  const createTweetBody = (tweetData) => {
    const $body = $("<p>").text(tweetData.content.text)
    return $body;
  };

  const createTweetFooter = (tweetData) => {
    const $footer = $("<footer>")
      .append($("<h3>").text(timeSince(tweetData.created_at)))
      .append($("<span class='icons'>")
        .append($("<img class='flag' src='/images/flag.png'>"))
        .append($("<img class='retweet' src='/images/retweet.png'>"))
        .append($("<img class='like' src='/images/like.png'>")))
    return $footer;
  };

  // works with the ^above^ 3 functions
  //calls functions for header, body, footer, and appends them to the article tweet
  //reduced to function calls to make the structure/content of the appends more intelligible
  const createTweetElement = (tweetData) => {
    const $tweet = $("<article class='tweet'>")
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
  const validateTweet = (tweetText) => {
    if (tweetText.length > 140) {
      $.flash("Tweet is too long");
      return false;
    } else if (!tweetText){
      $.flash("Tweet cannot be empty");
      return false;
    } else {
      return true;
    }
  };

  //Handles form submission for the compose tweet section
  //Takes in form text, and posts it into the /tweets JSON object
  //ES5 function, in order to preserve scope of "this"
  function handleNewTweet(event) {
    event.preventDefault();
    const $form = $(this);
    const formText = $form.find("textarea").val();
    if (validateTweet(formText)) {
      $.ajax({
        type: "POST",
        url:  "/tweets",
        data: $form.serialize()
      })
        .done($form[0].reset())
        .done(loadTweets)
        .done($(".counter").text("140"));
    }
  };

  //event listeners triggered on submission of compose tweet form
  const $form = $("#create-tweet");
  $form.on("submit", handleNewTweet);









  /////////////////////////////////////
  ///                               ///
  ///   FUNCTIONS TO LOAD TWEETS    ///
  ///                               ///
  /////////////////////////////////////


  //iterates through "tweets" calling createTweetElement for each given object in the array
  //appends each of the final results of createTweetElement to the DOM
  const renderTweets = (tweets) => {
    $("#tweets-container").empty();
    tweets.forEach(function(tweetObj) {
      const tweet = createTweetElement(tweetObj);
      $("#tweets-container").prepend(tweet);
    });
  };

  //Loads any tweets present in the JSON object located at "/tweets"
  const loadTweets = () => {
    $.ajax("/tweets")
    .done(renderTweets);
  }

  //loads page on first visit
  loadTweets();

});