$(document).ready(function() {
  // Specify explicitly when in production.
  var moveableServer = window.location.protocol + '//' + window.location.hostname + ':1137';
  
  $('.unmoved-moveable').unmoved({
    'objectsResource' : moveableServer + '/pages/' + encodeURIComponent(window.location.href) + '/objects'
  });
});
