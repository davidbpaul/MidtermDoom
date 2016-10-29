$(document).ready(function(){

 function renderRef(references) {

   });

 }
  function createArticleElement(article) {
     const createResource = (data) => {
      const $resource = $("<article>").addClass('white-panel').appendTo("section #pinBoot");
        $resource.append(`<header class = "header_is_on_top">
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
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venerit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
    return $resource;
    }


  };
 loadArticle()

  $("#referenceForm").on("submit", function (ev) {
    ev.preventDefault();
    const text = $('#referenceForm textarea').val()
    const data = $(this).serialize()
      $.ajax({
        url: '/api/resources',
        method: 'POST',
        data: data,
        success: loadArticle
      });

      $('#referenceForm textarea').val("")
  });

  function loadArticle(data){
    $.ajax({
      url: '/api/resources',
      method: 'GET',
      success: function (data) {
        renderArticles(data);
      }
    })
  }
  loadArticle();
});
