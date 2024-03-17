// jQuery code
$(document).ready(function () {
  // form data
  $("#igForm").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form data
    var formData = {
      name: $("#name_input").val(),
      email: $("#tagline_input").val(),
      post: $("#fileInput")[0].files[0],
    };
    console.log(formData.post);
    if (formData.post) {
      var reader = new FileReader();
      reader.onload = function (event) {
        var imageUrl = event.target.result;
        $("#pics1").html(
          `<img src="${imageUrl}" alt="Uploaded Image" width="200">`
        );
        $("#mainScreen").html(
          `<img src="${imageUrl}" alt="Uploaded Image" width="400">`
        );
      };
      reader.readAsDataURL(formData.post);
    } else {
      $("#pics1").html("<p>No file selected.</p>");
    }
    $("#namefinal").val(formData.name);
  });

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

  // Add event listeners for other buttons or inputs as needed
});
