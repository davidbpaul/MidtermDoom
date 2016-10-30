
$(document).ready(() => {
$( "#compose-reference" ).hide()

  $( "#composeNew" ).click(function(event) {
    console.log("button clicked");
    $( "#compose-reference" ).slideToggle();
    $(".text").focus();
  });

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
