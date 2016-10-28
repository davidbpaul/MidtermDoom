$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(`${user.name} ${user.email}`).appendTo($("body"));
    }
  });
});

$(function() {
  function renderReference(references) {
    $('#tweets-container').empty();
    $.each(tweets, function(index, ref) {
      var $eachref = createRefElement(ref);
      $eachref.prependTo("#reference-container");
    });

  }

  function createReferenceElement(reference) {
    console.log(tweet);
    var $tweet = $('<article>').addClass('tweet');
    var time = new Date(tweet.created_at)
    var formatTime = time.toLocaleDateString();
    $reference.html(
    `<article class = "white-panel">
         <header class = "header_is_on_top">
           <div class = "rating_score">
             <h3 class = "rating">5</h3>
           </div>
           <div class = "title"><h6><small>something I found interesting online</small></h6></div>
         </header>
         <section class= "body">
           <div class ='article_picture'>
             <img src="http://i.imgur.com/sDLIAZD.png" alt="">
           </div>
           <div class = 'article_title'>
             <h4><a href="#">Title 1</a></h4>
           </div>
         <div class = 'description'>
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
           irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
         </div>
         </section>
         <section>
            <div class = "head">
                <a class = "like"><big>like</big></a>
            </div>
         </section>
           <section class = "foot">
             <p><small>12 people have liked this..</small>
         </section>
             </article>`)
    return $tweet;
  }

  $("#submitTweet").on("click", function(event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: "/references",
      data: $('#tweetForm').serialize(),
      success: function(tweets) {
        redirect("/myref");
      }

    });
     $('textarea.text').val == "";
   });
  }
)


