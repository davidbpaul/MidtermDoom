$(() => {

  $( "#compose-reference" ).hide()

  $( "#composeNew" ).click(function(event) {
    console.log("button clicked");
    $( "#compose-reference" ).slideToggle();
    $(".text").focus();
  });

  function renderRef(references) {
    $('#references-container').empty();
    $.each(references, function(index, ref) {
      console.log(ref);
      var $eachref = createReferenceElement(ref);
      $eachref.prependTo("#references-container");
    });

  }

function createReferenceElement(ref) {
    console.log(ref);
    var $reference = $('<article>').addClass('ref');
    var time = new Date(ref.created_at)
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
    return $reference;
  }

function loadReference() {
    $.ajax({
      method: 'GET',
      url: '/',
      dataType: 'json',
      success: function(references) {
        renderRef(references);

      }
    });
  }

loadReference();

$("#submitReference").on("click", function(event) {
    event.preventDefault();
    if ($('textarea.text').val().length == 0) {
      return;
    }
    $.ajax({
      method: 'POST',
      url: "/",
      data: $('#referenceForm').serialize(),
      success: function(ref) {
        loadReference();
      }

    });
     $('textarea.text').val == "";

});






// may need to hide compose reference
