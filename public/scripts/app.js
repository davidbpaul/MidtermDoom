// // database
$(document).ready(function(){

  const createReference = (data) => {
    const $reference = $("<article>").addClass('white-panel').appendTo("section#pinBoot");

    $reference.append(`<a href="/resources/${data.id}">
                        <header class = "header_is_on_top">
                          <div class = "rating_score">
                            <h3 class = "rating">${Math.round(Number(data.avg))}</h3>
                          </div>
                          <div class = "title"><p>Created by: ${data.name}</p></div>
                        </header>
                        <section class= "body">
                          <div class ='article_picture'>
                            <img src=${data.image}>
                          </div>
                          <div class = 'article_title'>
                            <h4><a href="/resources/${data.id}">${data.title}</a></h4>
                          </div>
                          <div class = 'description'>
                            <p>${data.description}</p>
                          </div>
                        </section>
                        <section class = "foot">
                          <p>${data.count} people have liked this..</p>
                        </section>
                      </a>`)
  }

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

  $(".social .head .like").on("click", () => {
    const res_id = ($('#single').data('id'));
    $.ajax({
      method: 'POST',
      url: `/api/resources/${res_id}/likes`
    })
    $.ajax({
      method: 'GET',
      url: `/api/resources/${res_id}/likes`,
      success: (response) => {
          $('.foot p').text(`${response.length} people have liked this..`);
      }
    })
  })

  $("#search").on("click", (event) => {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: '/api/resources',
      success: (response) => {
        if ($('input.form-control').val()) {
          $('#pinBoot').html('');
          $('.container .row h2').text(`Search Results For: ${$('input.form-control').val()}`)
          for (const res of response) {
            if (res.title.includes($('input.form-control').val()) || res.description.includes($('input.form-control').val()) || res.name.includes($('input.form-control').val())) {
              createReference(res);
            }
          }
          alert(output);
        }
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

  $(".social .head .like").on("click", () => {
    const res_id = ($('#single').data('id'));
    $.ajax({
      method: 'POST',
      url: `/api/resources/${res_id}/likes`
    })
    $.ajax({
      method: 'GET',
      url: `/api/resources/${res_id}/likes`,
      success: (response) => {
          $('.foot p').text(`${response.length} people have liked this..`);
      }
    })
  })



  //comments
  function renderComments(comments) {
    console.log(comments)
    $('.comments').empty();
    comments.reverse().forEach(function(comment){
      console.log(comment)
      $('.comments').append(createCommentElement(comment));
    })
  }
  function createCommentElement(refComment) {
    const commentcontent = `  <div class="titleBox">
                                <label>Comments</label>
                                <button type="button" class="close" aria-hidden="true">&times;</button>
                              </div>
                              <div class="commentBox">
                                <p class="taskDescription">Let people know what you found helpful</p>
                              </div>
                              <div class="actionBox">
                                <ul class="commentList">
                                <li>
                                <div class="commentText">
                                  <p class="">Hello this is a test comment.</p> <span class="date sub-text">on March 5th, 2014</span>
                                </div>
                              </li>
                              <li>
                                <div class="commentText">
                                  <p class="">Hello this is a test comment and this comment is particularly very long and it goes on and on and on.</p> <span class="date sub-text">on March 5th, 2014</span>
                                </div>
                              </li>
                              <li>
                                <div class="commentText">
                                  <p class="">Hello this is a test comment.</p> <span class="date sub-text">on March 5th, 2014</span>
                                </div>
                              </li>
                            </ul>
                          <form class="form-inline" role="form">
                            <div class="form-group">
                              <input class="form-control" type="text" placeholder="Your comments" />
                            </div>
                            <div class="form-group">
                              <button class="btn btn-default">Add</button>
                            </div>
                          </form>
                        </div>`

    console.log(commentcontent)
    return commentcontent;
  };

 loadComments()

  $(".form-inline").on("submit", function (ev) {
    ev.preventDefault();
    const res_id = ($('#single').data('id'));
    console.log(res_id);
    const text = $('.form-control').val()
    console.log(text);
    console.log(text)
    const data = $(this).serialize()
    console.log(data)
      $.ajax({
        url: '/api/resources/${res_id}/comments',
        method: 'POST',
        data: data,
        success: loadComments
      });
      $('.form-control').val("")
  });

  function loadComments(){
    const res_id = ($('#single').data('id'));
    $.ajax({
      url: '/api/resources/${res_id}/comments',
      method: 'GET',
      success: function (data) {
        renderComments(data);
      }
    })
  }
  loadComments();
});

