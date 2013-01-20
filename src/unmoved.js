(function ($) {
  'use strict';
  
  $.fn.unmoved = function (options) {
    
    var settings = $.extend({
      'host' : ''
    }, options);
    
    var pages_objectsResource = settings.host + '/pages/' +
        encodeURIComponent(window.location.href) + '/objects';
    
    var load = function (object) {
      object.fadeTo('fast', 0.5);
      
      $.get(pages_objectsResource + '/' + object.context.id, function (data) {
        object.fadeTo('fast', 0);
        
        if (data.top !== undefined &&
            data.left !== undefined) {
          object.animate({
            'top'     : parseInt(data.top, 10),
            'left'    : parseInt(data.left, 10)
          }, 0);
        }
        
        object.fadeTo('fast', 1);
      });
    };
    
    var record = function (object) {
      if (object.css('cursor') === 'auto') {
        object.css('cursor', 'move');
      }
      
      object.draggable({
        'start' : function (event, ui) {
          object.fadeTo('fast', 0.5);
        },
        'stop' : function (event, ui) {
          $.post(pages_objectsResource + '/' + object.context.id, {
            'top'  : ui.position.top,
            'left' : ui.position.left
          }, function () {
            object.fadeTo('fast', 1);
          });
        }
      });
    };
    
    return this.each(function () {
      var $this = $(this);
      
      load($this);
      record($this);
    });
    
  };
  
}(jQuery));
