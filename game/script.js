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
$('#hingeForm').submit(function(event) {
  event.preventDefault(); 
  var hingeData = {
    want: $('#want_input').val(),
    fear: $('#fear_input').val(),
    jobdesc: $('#wantjob_input').val()
  };
    $('#linkedintitle').val("Hi I'm "+igData.name + " - "+ igData.tagline+ "! I want " + hingeData.want);
    $('#desc_input').val(hingeData.jobdesc);
    $('#wishfinal').val(hingeData.want)
    $('#fearfinal').val(hingeData.fear)
  });

  $('#linkedForm').click(function(event) {
    event.preventDefault(); 
    var linkedData = {
        jobdesc: $('#desc_input').val()
    };
    $('#jobfinal').val(linkedData.jobdesc)
  });

  $('#resultButton').click(function(event) {
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
    $('#growupfinal').val(gameData.growup)
// Show result on the page
    $('#result').removeClass('hidden');
    $('#result p').text('Your result is: ' + result);
    $('#eyesfinal').val(gameData.eye)
});
      // calculate result
      function calculateResult(q1, q2) {
// Example calculation (you can customize this logic)
if (q1 === 'Red') {
    return "You're a Strawberry, that means youre really extroverted and love helping people get along";
} else if (q1 === 'Blue') {
    return "You're a Blueberry, you must have a lot of different thoughts and are super creative.";
} else if (q1 === 'Green') {
    return "You're a Grape, you're mysterious but super funny when people get to know you!";
} else {
    return 'Unknown';
}
}

    // going to the next page
    var currentPage = 1;
    var totalPages = $(".page").length;

    function showPage(pageNumber) {
      $(".page").addClass("hidden");
      $(`#page${pageNumber}`).removeClass("hidden");
      currentPage = pageNumber;
    }

    function nextPage() {
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
      }
    }

    $("#nextButton1").click(nextPage);
    $("#nextButton2").click(nextPage);
    $("#nextButton3").click(nextPage);
    $("#nextButton4").click(nextPage);
    $("#nextButton5").click(nextPage);
    $("#nextButton6").click(nextPage);

    // Add event listeners for other buttons or inputs as needed
  });
