// // img url unvalid

// $(() => {
//   function renderRef(references) {
//     $('#references-container').empty();
//     $.each(references, function(index, ref) {
//       console.log(ref);
//       var $eachref = createReferenceElement(ref);
//       $eachref.prependTo("#references-container");
//     });

//   }

// function createReferenceElement(ref) {
//     console.log(ref);
//     var $reference = $('<article>').addClass('ref');
//     var time = new Date(ref.created_at)
//     var formatTime = time.toLocaleDateString();
//     $reference.html(

//       `<article class = "white-panel">
//           <header class = "header_is_on_top">
//             <div class = "rating_score">
//               <h3 class = "rating">${ref.ratings.rating}</h3>
//             </div>

//             <div class = "title">
//               <h6><small>${ref.users.name}</small></h6></div>
//           </header>
//           <section class= "body">
//             <div class ='article_picture'>
//               <img src="${ref.resources.img_url}" alt="">
//             </div>
//             <div class = 'article_title'>
//               <h4><a href="#${ref.resources.link}">${ref.resources.title}</a></h4>
//             </div>
//           <div class = 'description'>
//             <p>${ref.resources.description}</p>
//           </div>
//           </section>
//           <section>
//              <div class = "head">
//                  <a class = "like"><big>like</big></a>
//              </div>
//           </section>
//             <section class = "foot">
//               <p><small>${people_} people have liked this..</small>
//           </section>
//               </article>`)
//     return $reference;
//   }

// function loadReference() {
//     $.ajax({
//       method: 'GET',
//       url: '/',
//       dataType: 'json',
//       success: function(references) {
//         renderRef(references);

//       }
//     });
//   }

// loadReference();

// $("#submitReference").on("click", function(event) {
//     event.preventDefault();
//     if ($('textarea.text').val().length == 0) {
//       return;
//     }
//     $.ajax({
//       method: 'POST',
//       url: "/",
//       data: $('#referenceForm').serialize(),
//       success: function(ref) {
//         loadReference();
//       }

//     });
//      $('textarea.text').val == "";

// });




// // may need to hide compose reference


// // database
$(document).ready(function(){

  //this takes each individule article and adds it to the section pinBoot (where user tweets are located)
  function renderTweets(articles) {
    $('#pinBoot').empty();
    //empties old articles so we dont get multiple of the same
    tweets.reverse().forEach(function(tweet){
      //add each article to the container
      $('#pinBoot').append(createTweetElement(tweet));
    })
  }

  //callback that creates articles
  function createTweetElement(tweet) {
    // converts date from unix time stamp

    // database information is put into a universal tweet container to create each tweet
    const tweetcontent = `<article class = "eachTweet">
                            <header class = "head">
                              <img class="pic" src=${escape(tweet.user.avatars.small)}>
                              <h2 class ="name">${escape(tweet.user.name)}</h2>
                              <a class = "user-name">${escape(tweet.user.handle)}</a>
                            </header>
                            <div class="message">
                              <p>${escape(tweet.content.text)}</p>
                            </div>
                            <footer class = "foot">
                              <p class = "time"><small>${escape(duration)}</small></p>
                              <img class="buttons" src="/images/all.png">
                            </footer>
                          </article>`

    return tweetcontent;
  };
  //secures database (people cant input there own information into the string interpolation )
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
 loadTweets()

// post tweet
  $("form").on("submit", function (ev) {
    //prevent form from submitting
    ev.preventDefault();
    //text = user input
    const text = $('#tweet-text').val()
    //creates string by serializing form values
    const data = $(this).serialize()
    //checks if tweet is absent
    if (isTweetEmpty(text)) {
      //sends alert
      alert('enter a tweet!')
      //ends function
      return;
    //checks if tweet is to long
    } else if (isTweetToLong(text)) {
      //sends alert
      alert('tweet to long!')
      //ends function
      return;
      //submits tweet
    } else {
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: data,
        success: loadTweets
      });
      //empties form content
      $('#tweet-text').val("")
    };
  });

  //function checks if tweet is empty
  function isTweetEmpty(data) {
    data = data.trim();
    return data === null || data === "";
  }
  //function checks if tweet supersedes limit
  function isTweetToLong(data) {
    return data.length > 140;
  }
  //tweets
  function loadTweets(){
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function (data) {
        renderTweets(data);
      }
    })
  }
  loadTweets();
  //toggle and select form
  $('.new-tweet').hide();
  $('button').click(function(){
    $('.new-tweet').slideToggle('slow');
     $("#tweet-text").focus();
  });

  $('.tweet-tweet').on("mouseover",'.eachTweet', function(){
    $(this).find($('.buttons')).toggle();
  });
   $('.tweet-tweet').on("mouseout",'.eachTweet', function(){
    $(this).find($('.buttons')).toggle();
  });
});
