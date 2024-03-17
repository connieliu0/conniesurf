$(document).ready(function () {
  $("#fileInput").change(function () {
    var file = this.files[0];

    if (file) {
      var reader = new FileReader();
      reader.onload = function (event) {
        var imageUrl = event.target.result;
        $("#imagePreview").html(
          `<img src="${imageUrl}" alt="Uploaded Image" width="200">`
        );

        // Share the image URL with the main screen
        $("#mainScreen").html(
          `<img src="${imageUrl}" alt="Uploaded Image" width="400">`
        );
      };
      reader.readAsDataURL(file);
    } else {
      $("#imagePreview").html("");
      $("#mainScreen").html("");
    }
  });
});
