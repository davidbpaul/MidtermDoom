$(document).ready(() => {
  const createResource = (data) => {
    const $resource = $("<article>").addClass('white-panel').appendTo("section#pinBoot");
    $resource.append(`<header class = "header_is_on_top">
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
    return $resource;
    }

    const renderResources = (resources) => {
      for (const resource of resources) {
        createResource(resource);
      }
    }

    $.ajax({
      method: 'GET',
      url: '/topics',
      success: (response) => {
        renderResources(response);
      }
    })
  })
