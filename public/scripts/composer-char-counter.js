$(document).ready(function() {
  // --- our code goes here ---
  
  console.log('ready for manipulation')
  
  $('.container .new-tweet form textarea').keyup(function(event) {
    //We need to count the specific letters in the box.
    let currentvalue = $(this).val().length;
    let count = 140;
    charCount = count - currentvalue;
    //Traverse the DOM tree to find the counterlocation
    let counterLocation = ($(this).parent().children()[2])
    //Ammend the inner text of the counter (we use the text fucntion with Jquery)
    $(counterLocation).text(charCount)
    //Write some logic that occurs when charCount < 0 to display when red
    if (charCount < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
    
  });

  // $('#form-tweet').submit(function(event) {
  //   console.log(event)
  //   event.preventDefault()
    
  // })
  
});


