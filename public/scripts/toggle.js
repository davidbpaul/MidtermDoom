$(document).ready(() => {

    $( "#composeNew" ).click(function(event) {
      console.log("button clicked");
      $( "#compose-reference" ).slideToggle();
      $(".text").focus();
    });
})

//may need to wrap in function
