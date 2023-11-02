var acc = document.getElementsByClassName("accordion");

// Loop through all the buttons and add an event listener to each one
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    // Toggle between adding and removing the "active" class to the current button
    this.classList.toggle("active");

    // Get the panel under the current button
    var panel = this.nextElementSibling;

    // Toggle between hiding and showing the panel
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
