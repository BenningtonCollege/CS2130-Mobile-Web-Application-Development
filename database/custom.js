$(document).bind("mobileinit", function() {
  $.mobile.page.prototype.options.addBackBtn = true;
  
  initDB();
});

$('#home').live('pageinit', function(event, ui) {
  
  readRSS("http://apod.nasa.gov/apod.rss");
  
  $("#useroption")[0].innerHTML = localStorage.firstname + " " + localStorage.lastname;
});


var db;
function initDB() {
  var shortName = 'apod';
  var version = '1.0';
  var displayName = 'apod';
  var maxSize = 65536;
  
  var createSql = 'CREATE TABLE IF NOT EXISTS posts                              \
                   (id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,       \
                   pubdate     TEXT,                                             \
                   title       TEXT,                                             \
                   link        TEXT,                                             \
                   description TEXT,                                             \
                   author      TEXT );                                           \
   ';
  
  db = openDatabase(shortName, version, displayName, maxSize);
  db.transaction(
      function(transaction) {
          transaction.executeSql(createSql);
      }
  );
  
}

function successHandler(transaction, results) {
    //alert('ok');
    return true;
}

function errorHandler(transaction, error) {
    alert('Error: ' + error.message + ' (Code ' + error.code + ')');
      return true;
}


function insert(item) {
  var insertSql = 'INSERT INTO posts (title, link, description, author, pubdate)   \
                   VALUES (?, ?, ?, ?, ?);                                         \
  ';
    
  db.transaction(
      function(transaction) {
          transaction.executeSql(
              insertSql,
              [item.title, item.link, item.description, item.author, item.pubdate],
              successHandler,
              errorHandler
          );
      }
  );
}

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
              
          insert(item);
      });
  });
  
}



function submitForm() {
  localStorage.firstname = $("#firstname").val();
  localStorage.lastname  = $("#lastname").val();
  history.back();
}

