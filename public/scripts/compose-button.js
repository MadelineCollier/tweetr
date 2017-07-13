$(document).ready(function() {

  //hides compose tweet section to begin with
  $(".new-tweet").hide();


  //displays compose tweet section when the compose button is clicked
  //focuses on text area automatically
  const $compose = $(".compose");
  $compose.on("click", function () {
    $(".new-tweet").slideToggle(function(){
       $("#create-tweet textarea").focus();
    });
  });


});