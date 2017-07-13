$(() => {

  //event listener and function which calculate characters remaining until 140 limit
  // makes the character counter red by adding a new class when over 140 characters
  $(".new-tweet textarea").on("keyup", function() {
    const input = $(this).val();
    const charLeft = 140 - input.length;
    const counter = $(this).closest("form").find('.counter');
    counter.text(charLeft);
    if (charLeft < 0) {
      counter.addClass("error");
    } else {
      counter.removeClass("error");
    }
  });

});