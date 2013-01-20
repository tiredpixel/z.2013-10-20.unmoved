$(document).ready(function() {
  $('.new-game').attr('href',
      '?id=' + Math.random().toString(36).substring(2, 10));
  
  $('.piece').unmoved({
  });
});
