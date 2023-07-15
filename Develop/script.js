$(function () {
  // Retrieve and display the current date in the header
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  // Function to create a time block for each hour and apply styling based on current time
  function createTimeBlocks() {
    // Get the current hour in 24-hour format
    var currentHour = dayjs().format("H");

    // Loop through each hour from 9am to 5pm
    for (var hour = 9; hour <= 17; hour++) {
      var $timeBlock = $("<div>").addClass("row time-block");
      var $hour = $("<div>")
        .addClass("col-2 col-md-1 hour text-center py-3")
        .text(dayjs(hour, "H").format("hA"));
      var $description = $("<textarea>").addClass("col-8 col-md-10 description");
      var $saveBtn = $("<button>")
        .addClass("btn saveBtn col-2 col-md-1")
        .attr("aria-label", "save")
        .html('<i class="fas fa-save" aria-hidden="true"></i>');

      // Set the id of the time block using the hour
      $timeBlock.attr("id", "hour-" + hour);

      // Apply past, present, or future class based on the current hour
      if (hour < currentHour) {
        $timeBlock.addClass("past");
      } else if (hour == currentHour) {
        $timeBlock.addClass("present");
      } else {
        $timeBlock.addClass("future");
      }

      // Retrieve and set the saved event from local storage
      var savedEvent = localStorage.getItem("hour-" + hour);
      if (savedEvent) {
        $description.val(savedEvent);
      }

      // Add event listener to save button to save the event in local storage
      $saveBtn.on("click", function () {
        var eventId = $(this).parent().attr("id");
        var eventText = $(this).siblings(".description").val().trim();
        localStorage.setItem(eventId, eventText);
      });

      // Append the elements to the time block
      $timeBlock.append($hour, $description, $saveBtn);

      // Append the time block to the container
      $(".container-fluid").append($timeBlock);
    }
  }

  // Call the createTimeBlocks function to generate the time blocks
  createTimeBlocks();
});
