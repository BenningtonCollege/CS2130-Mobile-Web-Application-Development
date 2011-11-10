/*
     In this file you can add your own custom JavaScript functions to change 
     default behaviors, add new behaviors, etc. 
*/

// When the document is fully loaded and when the mobileinit event happens, 
$(document).bind("mobileinit", setjQueryMobileDefaults);



function setjQueryMobileDefaults() {

  // Navigation
  $.mobile.page.prototype.options.backBtnText     = "Back";
  $.mobile.page.prototype.options.addBackBtn      = true;
  $.mobile.page.prototype.options.backBtnTheme    = "b";

  // Page
  $.mobile.page.prototype.options.headerTheme     = "b";  // Page header only
  $.mobile.page.prototype.options.contentTheme    = "b";
  $.mobile.page.prototype.options.footerTheme     = "b";

  // Listviews
  $.mobile.listview.prototype.options.headerTheme     = "b";  // Header for nested lists
  $.mobile.listview.prototype.options.theme           = "a";  // List items / content
  $.mobile.listview.prototype.options.dividerTheme    = "b";  // List divider

  $.mobile.listview.prototype.options.splitTheme        = "b";
  $.mobile.listview.prototype.options.countTheme        = "b";
  $.mobile.listview.prototype.options.filterTheme       = "b";
  $.mobile.listview.prototype.options.filterPlaceholder = "Filter data...";
  
}