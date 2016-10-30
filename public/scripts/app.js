
$(document).ready(() => {
$( "#compose-reference" ).hide()

  $( "#composeNew" ).click(function(event) {
    console.log("button clicked");
    $( "#compose-reference" ).slideToggle();
    $(".text").focus();
  });


  const newResourceElement = (data) => {
    const $resourceEl = $("<article>").addClass('white-panel').appendTo("section#pinBoot");
    $resourceEl.append(`<header class = "header_is_on_top">
                        <div class = "rating_score">
                          <h3 class = "rating">5</h3>
                        </div>
                        <div class = "title"><h6><small>something I found interesting online</small></h6></div>
                      </header>
                      <section class= "body">
                        <div class ='article_picture'>
                          <img src=${data.image} alt="">
                        </div>
                        <div class = 'article_title'>
                          <h4><a href="#">${data.title}</a></h4>
                        </div>
                        <div class = 'description'>
                          <p>${data.description}</p>
                        </div>
                      </section>
                      <section>
                         <div class = "head">
                             <a class = "like"><big>like</big></a>
                         </div>
                      </section>
                      <section class = "foot">
                        <p><small>12 people have liked this..</small>
                      </section>`)
    return $resourceEl;
    }

    const renderResources = (resources) => {
      for (const resource of resources) {
        newResourceElement(resource);
      }
    }

    $.ajax({
      method: 'GET',
      url: '/api/resources',
      success: (response) => {
        renderResources(response);
      }
    })
  })


$("#submitReference").on("click", function(event) {
  console.log("submit clicked")
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: "/api/resources",
      data: $('#referenceForm').serialize(),
      success: function(ref) {
        loadReference();
      }

    });
     $('textarea.text').val == "";

});



