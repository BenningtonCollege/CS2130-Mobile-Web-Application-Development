$(document).bind("mobileinit", function() {
  $.mobile.page.prototype.options.addBackBtn = true;
  
  if ( (localStorage.feed === undefined) || (localStorage.feed === "") ){
    localStorage.feed = "http://www.wizards.com/dnd/Globals/Services/ArticleFeed.aspx";
  }

  initDB();
  readRSS(localStorage.feed);
});

$('#home').live('pageinit', function(event, ui) {    
  populateHomePage();
});




$('#settings').live('pageinit', function(event, ui) {
  // Setting the value of form fields
  $("#feed").val(localStorage.feed);
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
        //transaction.executeSql("delete from posts;");
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


function successHandler_populate(transaction, results) {
    
    for (var i = 0; i < results.rows.length; i++) {
      // console.log(results.rows.item(i).title);

      // populate home screen with links
      $("#feeditems li:last").clone().removeClass("ui-corner-top ui-corner-bottom").appendTo("#feeditems");
      $("#feeditems li:last a")[0].innerHTML = results.rows.item(i).title;
      $("#feeditems li:last a")[0].href = results.rows.item(i).link;

    }
    
    return true;
}

function populateHomePage() {
  var selectSql = 'SELECT * FROM posts';
    
  db.transaction(
      function(transaction) {
          transaction.executeSql(
              selectSql,
              [],
              successHandler_populate,
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

