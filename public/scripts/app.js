$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(`${user.name} ${user.email}`).appendTo($("body"));
    }
  });
  $( "#composeNew" ).click(function() {
    console.log("button clicked");
    $( "#compose-reference" ).slideToggle();
    $(".text").focus();
  });

});



  // $( "#composeNew" ).click(function() {
  //   console.log("button clicked");
  //   //$( "#compose-reference" ).slideToggle();
  //  // $(".text").focus();
  // });




