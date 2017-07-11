// <section class="new-tweet">
//   <h2>Compose Tweet</h2>
//   <form action="/tweets" method="POST">
//     <textarea name="text" placeholder="What are you humming about?"></textarea>
//     <input type="submit" value="Tweet">
//     <span class="counter">140</span>
//   </form>
// </section>



$( document ).ready(function() {

  $(".new-tweet textarea").on("keyup", function() {
    var input = $(this).val();
    var charLeft = 140 - input.length
    var counter = $(this).closest("form").find('.counter');
    counter.text(charLeft);
    if (charLeft < 0) {
      counter.addClass("error");
    } else {
      counter.removeClass("error");
    }
  });

});
