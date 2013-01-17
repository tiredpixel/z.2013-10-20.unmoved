(function($) {
  'use strict';
  
  $.fn.unmoved = function(options) {
    
    var settings = $.extend({
      'objectsResource' : '/pages/' + encodeURIComponent(window.location.href) + '/objects',
    }, options);
    
    return this.each(function() {
      
      var $this = $(this);
      
      var $load = function() {
        $this.fadeTo('fast', 0.5);
        
        $.get(settings.objectsResource, function(data) {
          for (var id in data) {
            if (data.hasOwnProperty(id)) {
              if ('top' in data[id] && 'left' in data[id]) {
                $('#' + id).animate({
                  'top'     : parseInt(data[id].top),
                  'left'    : parseInt(data[id].left),
                  'opacity' : 1,
                }, 'fast');
              }
            }
          }
          
          $this.fadeTo('fast', 1);
        });
      };
      
      var $record = function() {
        $this.draggable({
          'start' : function(event, ui) {
            ui.helper.fadeTo('fast', 0.5);
          },
          'stop' : function(event, ui) {
            $.post(settings.objectsResource + '/' + ui.helper.context.id, {
              'top'  : ui.position.top,
              'left' : ui.position.left,
            }, function() {
              ui.helper.fadeTo('fast', 1);
            });
          }
        });
      };
      
      $load();
      $record();
      
    });
    
  };
  
})(jQuery);
