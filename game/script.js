  // jQuery code
  $(document).ready(function () {
    // form data
  //first form
  var igData = {};
  var hingeData = {};
  var linkedData = {};


  $('#igForm').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        // Get form data
        igData = {
            name: $('#name_input').val(),
            tagline: $('#tagline_input').val(),
            post: $('#fileInput')[0].files[0],
        };
        if (igData.post) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var imageUrl = event.target.result;
                $('#pics1').html(`<img src="${imageUrl}" alt="Uploaded Image" width="200">`);
                $('#final').html(`<img src="${imageUrl}" alt="Uploaded Image" width="200">`);
              };
            reader.readAsDataURL(igData.post);
        } else {
            $('#pics1').html('<p>No file selected.</p>');
        }
        $('#namefinal').val(igData.name)
    });
  $('#quizForm').submit(function(event) {
      event.preventDefault();
      var q1 = $('input[name="question1"]:checked').val();
      var q2 = $('input[name="question2"]:checked').val();
      var gameData = {
            eye: q1,
            goodPerson: q2,
            growup: $('#growup_input').val(),
        };
      var result = calculateResult(q1, q2);
      $('#goodfinal').val(gameData.goodPerson)
      $('#title_input').val(gameData.growup)
  // Show result on the page
      $('#result').removeClass('hidden');
      $('#result p').text(result);
      $('#eyesfinal').val(gameData.eye)
      $('#want_input').val("I want to be a " +gameData.growup)
      $('#fear_input').val("dying alone")

    });
$('#hingeForm').submit(function(event) {
  event.preventDefault(); 
  var hingeData = {
    want: $('#want_input').val(),
    fear: $('#fear_input').val(),
    post: $('#hInput')[0].files[0]
  };
    $('#linkedintitle').val("Hi I'm "+igData.name + " - "+ igData.tagline+ "! I want " + hingeData.want);
    $('#wishfinal').val(hingeData.want)
    $('#fearfinal').val(hingeData.fear)
    $('#desc_input').val("Created feautures that increased user growth by 10% leading to a $20 increase in company profit margins")

    if (hingeData.post) {
      var reader = new FileReader();
      reader.onload = function(event) {
          var imageUrl = event.target.result;
          $('#pics2').html(`<img src="${imageUrl}" alt="Uploaded Image" width="200">`);
          $('#page7').css('background-image', `url(${imageUrl})`);
        }
      reader.readAsDataURL(hingeData.post);
  } else {
      $('#pics2').html('<p>No file selected.</p>');
  }
  });

  $('#linkedForm').submit(function(event) {
    event.preventDefault(); 
    var linkedData = {
        jobtitle: $('#title_input').val()
    };

    $('#jobfinal').val(linkedData.jobtitle)
  });


  // Add a click event listener to the submit button
  $("form").submit(function(event) {
    // Show the nextButton when the submit button is clicked
    $(".next").css("visibility", "visible");
  });

      // calculate result
      function calculateResult(q1, q2) {
// Example calculation (you can customize this logic)
if (q1 === 'Red') {
    return "You're a Strawberry 🍓, that means youre really extroverted and love helping people get along";
} else if (q1 === 'Blue') {
    return "You're a Blueberry 🫐, you must have a lot of different thoughts and are super creative.";
} else if (q1 === 'Green') {
    return "You're a Grape , you're mysterious but super funny when people get to know you!";
} else {
    return 'You haven`t submitted anything! How will we know what fruit you are!';
}
}

    // going to the next page
    var currentPage = 1;
    var totalPages = $(".page").length;
    var interlude=1;

    function showPage(pageNumber) {
      if (pageNumber != 6) {
        $(".page").addClass("hidden");
        $(`#page${pageNumber}`).removeClass("hidden");
        currentPage = pageNumber;
        console.log(currentPage);
      } else if (pageNumber == 6) {
        const dialog = document.querySelector("dialog");
        dialog.showModal(); // Use the native JavaScript showModal method
        currentPage = pageNumber;
        console.log(currentPage);
      }
    }

    function nextPage() {
      if (currentPage < totalPages) {
        $(".next").css("visibility", "hidden");
        if (currentPage == 5) {
            if (interlude <= 4) {
                if (interlude == 1) {
                    $('#dialogue').html('<h2>Are you sure? Is this the right eye color?</h2>');
                    $('#intro').css("visibility","hidden");
                } else if (interlude == 2) {
                    $('#dialogue').html('<h2>Is this really you? Remember, it has to be correct or else you won`t reach your destination.</h2>');
                } else if (interlude == 3) {
                    $('#dialogue').html('<h2>I`ll give you some more time, is this you?</h2>');
                } else if (interlude == 4) {
                    showPage(currentPage + 1);
                }
                interlude++;
            }
        } else {
            showPage(currentPage + 1); // Call showPage only if currentPage is not 5
        }
      }
    }

    $("#nextButton1").click(nextPage);
    $("#nextButton2").click(nextPage);
    $("#nextButton3").click(nextPage);
    $("#nextButton4").click(nextPage);
    $("#nextButton5").click(nextPage);
    const dialog = document.querySelector("#page6");

    const nextButton6 = document.querySelector("#nextButton6");
    nextButton6.addEventListener("click", function(e) {
      e.preventDefault();
      dialog.close("submit");
      console.log("close");
  });
    dialog.addEventListener("close", function() {
        if (dialog.returnValue === "submit") {
          showPage(7)
            console.log("submit");
        }
    });
    // Add event listeners for other buttons or inputs as needed
  });
