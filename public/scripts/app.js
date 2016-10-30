// // database
$(document).ready(function(){

 function renderRef(references) {
   $('#references-container').empty();
   $.each(references, function(index, ref) {
     console.log(ref);
     var $eachref = createArticleElement(ref);
     $eachref.prependTo("#references-container");
   });

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
