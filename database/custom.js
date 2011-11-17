$(document).bind("mobileinit", function() {
  $.mobile.page.prototype.options.addBackBtn = true;
  
  if ( (localStorage.feed === undefined) || (localStorage.feed === "") ){
    localStorage.feed = "http://www.wizards.com/dnd/Globals/Services/ArticleFeed.aspx";
  }

  initDB();
});

$('#home').live('pageinit', function(event, ui) {    
  readRSS(localStorage.feed);
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
                   link        TEXT UNIQUE,                                      \
                   description TEXT,                                             \
                   author      TEXT );                                           \
   ';
  
  db = openDatabase(shortName, version, displayName, maxSize);
  db.transaction(
      function(transaction) {
        transaction.executeSql(createSql,
                               [],
                               successHandler,
                               errorHandler
        );
        //transaction.executeSql("delete from posts;");
      }
  );
  
}


/******************************************
    BEGIN INSERT HANDLERS
******************************************/

function successHandler(transaction, results) {
  //alert('ok');
  return true;
}

function errorHandler(transaction, error) {
  if (error.code !== 1) {
    alert('Error: ' + error.message + ' (Code ' + error.code + ')');
  }
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

/******************************************
    BEGIN POPULATE HANDLERS
******************************************/

function successHandler_populate(transaction, results) {
    var li;
    for (var i = 0; i < results.rows.length; i++) {
      // console.log(results.rows.item(i).title);

      // populate home screen with links
      if (i === 0) {
        li = $("#feeditems li:last");
      } else {
        li = $("#feeditems li:last").clone();;
      }
      
      if ( i === 0 ) {
        li.addClass("ui-corner-top");
      } else {
        li.removeClass("ui-corner-top");
      }
      
      if ( i === (results.rows.length - 1) ) {
        // it's not the last list item
        li.addClass("ui-corner-bottom");
      } else {
        li.removeClass("ui-corner-bottom");
      }
      
      $("#feeditems li:last a")[0].innerHTML = results.rows.item(i).title;
      $("#feeditems li:last a")[0].href = results.rows.item(i).link;

      li.appendTo("#feeditems");

    }
    
    return true;
}

function populateHomePage() {
  var selectSql = 'SELECT * FROM posts';
    
  db.transaction(
      function(transaction) {
          transaction.executeSql(
              selectSql,
              [ ],
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
  localStorage.feed = $("#feed").val();
  history.back();
}










