$(document).bind("mobileinit", function() {
  $.mobile.page.prototype.options.addBackBtn = true;
});

$('#home').live('pageinit', function(event, ui) {
  $("#useroption")[0].innerHTML = localStorage.firstname + " " + localStorage.lastname;
});

$('#userProfile').live('pageinit', function(event, ui) {
  // Using localStorage to control the text or images displayed on pages.
  $("#profilePicture")[0].src = "images/" + localStorage.lastname.toLowerCase() + "-" + localStorage.firstname.toLowerCase() + ".jpg";
  //           images/doane-william.jpg
});

$('#settings').live('pageinit', function(event, ui) {
  // Setting the value of form fields
  $("#firstname").val(localStorage.firstname);
  $("#lastname").val(localStorage.lastname);
});


function submitForm() {
  localStorage.firstname = $("#firstname").val();
  localStorage.lastname  = $("#lastname").val();
  history.back();
}

