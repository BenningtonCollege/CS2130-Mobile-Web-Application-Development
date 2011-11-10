$(document).bind("mobileinit", function() {
  $.mobile.page.prototype.options.addBackBtn = true;
});

function submitForm() {
  localStorage.firstname = $("#firstname").val();
  localStorage.lastname  = $("#lastname").val();
  history.back();
}

$(document).bind("pagebeforeshow", function() {
  // Using localStorage to control the text or images displayed on pages.
  $("#useroption")[0].innerHTML = localStorage.firstname + " " + localStorage.lastname;
  $("#profilePicture")[0].src = "images/" + localStorage.lastname.toLowerCase() + "-" + localStorage.firstname.toLowerCase() + ".jpg";

  // Setting the value of form fields
  $("#firstname").val(localStorage.firstname);
  $("#lastname").val(localStorage.lastname);
});