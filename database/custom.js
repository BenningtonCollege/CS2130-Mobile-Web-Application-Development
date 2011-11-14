

$(document).bind("mobileinit", function() {
  $.mobile.page.prototype.options.addBackBtn = true;
});

$('#home').live('pageinit', function(event, ui) {
  
  readRSS("http://apod.nasa.gov/apod.rss");
  
  $("#useroption")[0].innerHTML = localStorage.firstname + " " + localStorage.lastname;
});



function readRSS(rssurl) {
          
  $.get(rssurl, function(data) {
      var xml = $(data);

      xml.find("item").each(function() {
          var that = $(this),
              item = {
                  title: that.find("title").text(),
                  link: that.find("link").text(),
                  description: that.find("description").text(),
                  pubDate: that.find("pubDate").text(),
                  author: that.find("author").text()
              }
              
          $("#content")[0].innerHTML += item.description ;
      });
  });
  
}



function submitForm() {
  localStorage.firstname = $("#firstname").val();
  localStorage.lastname  = $("#lastname").val();
  history.back();
}

