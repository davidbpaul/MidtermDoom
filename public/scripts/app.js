// // database
$(document).ready(function(){

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
});
