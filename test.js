(function($) {
  function checkDataArray() {
    if(typeof dataArray !== 'object' || !dataArray.length) {
      throw new Error('Array of questions is missing!!!');
    }
  }

  methods = {
    init: function() {
      htmlRepresentation.call(this, dataArray[0]);
      //this.append(resultHtml);
    },
    remove: function() {
      this.html('');
    },
    update: function() {
      methods.remove.apply(this, arguments);
      methods.init.apply(this, arguments);
    }
  };

  function htmlRepresentation(object) {
    var html = '';

    //console.log(this);
    html = html + '<div id="question">' + object.title + '</div>';
    html = html + '<ul id="questions-block"></ul>';

    $(this).append(html);
    _.each(object.answers, function(element) {
      $(this).find('#questions-block').append('<li>' + element.answer + '</li>').on('click', function() {
        console.log(element.answer);
      })
    }, this);
    $(this).append('<button>' + 'back' + '</button>');
  }

  $.fn.inquirer = function Inquired() {

    checkDataArray();

    var method = arguments[0];

    if (methods[method]) {
      method = methods[method];
      arguments = Array.prototype.slice.call(arguments, 1);
    } else {
      throw new Error('Wrong method!!!');
    }

    return method.apply(this, arguments);
  };

  function parse() {

  }



})(jQuery);

$('#wrapper').inquirer('init', '1111');
//setTimeout(function() {
//  $('#wrapper').inquirer('remove');
//}, 1000);
//setTimeout(function() {
//  $('#wrapper').inquirer('update');
//}, 5000);