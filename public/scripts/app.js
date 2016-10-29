// // img url unvalid

// $(() => {
//   function renderRef(references) {
//     $('#references-container').empty();
//     $.each(references, function(index, ref) {
//       console.log(ref);
//       var $eachref = createReferenceElement(ref);
//       $eachref.prependTo("#references-container");
//     });

//   }

// function createReferenceElement(ref) {
//     console.log(ref);
//     var $reference = $('<article>').addClass('ref');
//     var time = new Date(ref.created_at)
//     var formatTime = time.toLocaleDateString();
//     $reference.html(

//       `<article class = "white-panel">
//           <header class = "header_is_on_top">
//             <div class = "rating_score">
//               <h3 class = "rating">${ref.ratings.rating}</h3>
//             </div>

//             <div class = "title">
//               <h6><small>${ref.users.name}</small></h6></div>
//           </header>
//           <section class= "body">
//             <div class ='article_picture'>
//               <img src="${ref.resources.img_url}" alt="">
//             </div>
//             <div class = 'article_title'>
//               <h4><a href="#${ref.resources.link}">${ref.resources.title}</a></h4>
//             </div>
//           <div class = 'description'>
//             <p>${ref.resources.description}</p>
//           </div>
//           </section>
//           <section>
//              <div class = "head">
//                  <a class = "like"><big>like</big></a>
//              </div>
//           </section>
//             <section class = "foot">
//               <p><small>${people_} people have liked this..</small>
//           </section>
//               </article>`)
//     return $reference;
//   }

// function loadReference() {
//     $.ajax({
//       method: 'GET',
//       url: '/',
//       dataType: 'json',
//       success: function(references) {
//         renderRef(references);

//       }
//     });
//   }

// loadReference();

// $("#submitReference").on("click", function(event) {
//     event.preventDefault();
//     if ($('textarea.text').val().length == 0) {
//       return;
//     }
//     $.ajax({
//       method: 'POST',
//       url: "/",
//       data: $('#referenceForm').serialize(),
//       success: function(ref) {
//         loadReference();
//       }

//     });
//      $('textarea.text').val == "";

// });




// // may need to hide compose reference


// // database

