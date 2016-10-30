$(document).ready(() => {
  const createTopic = (data) => {
    const $topic = $("<article>").addClass('white-panel').appendTo("section#pinBoot");
    $topic.append(`<section class= "body">
                        <a href="/topics/${data.id}">
                          <div class = 'article_title'>
                            <h4>${data.topic}</h4>
                          </div>
                        </a>
                      </section>`)
    return $topic;
  }

  const renderTopics = (resources) => {
    for (const resource of resources) {
      createTopic(resource);
    }
  }

  $.ajax({
    method: 'GET',
    url: '/api/topics',
    success: (response) => {
      renderTopics(response);
    }
  })
})
