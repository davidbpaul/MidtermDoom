$(document).ready(() => {
  $( "#compose-reference" ).hide()
    $( "#composeNew" ).click(function(event) {
      console.log("button clicked");
      $( "#compose-reference" ).slideToggle();
      $("input[name=url]").focus();
    });
})

//may need to wrap in function
