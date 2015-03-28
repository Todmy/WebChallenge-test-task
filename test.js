(function($) {
  function _checkDataArray() {
    if (typeof dataArray !== 'object' || !dataArray.length) {
      throw new Error('Array of questions is missing!!!');
    }
  }

  function Inquirer(self, arguments) {
    this.element = self;
    this.methods = _methods.bind(this)();
    var method = arguments[0] || 'init';

    _checkDataArray();

    if (this.methods[method]) {
      this.methods[method]();
    } else {
      throw new Error('Wrong method!!!');
    }
  }

  function _methods() {
    var self = this;
    return {
      init: function(objectId) {
        objectId = objectId || '0001';
        var resultHtml = self.htmlRepresentation(self.getCurrentObject(objectId));
        self.element.append(resultHtml);
        self._bindEvents();
      },
      remove: function() {
        $(self.element).empty();
      },
      update: function(objectId) {
        self.methods.remove();
        self.methods.init(objectId);
      }
    }
  }

  Inquirer.prototype._bindEvents = function() {
    $(this.element).find('#questions-block li').on('click', this.questionProvider());
  };

  Inquirer.prototype.getCurrentObject = function(objectId) {
    return _.find(dataArray, function(element) {
      return element.id === objectId;
    })
  };

  Inquirer.prototype.htmlRepresentation = function(object) {

    if(object.answers === 'undefined') {
      return '<div id="conclusion">' + object.title + '</div>';
    }

    var html = '';

    html = html + '<div id="question">' + object.title + '</div>';

    var questions = _.reduce(object.answers, function(memo, element) {
      return memo + '<li data-link="' + element.link + '">' + element.answer + '</li>';
    }, '');

    html = html + '<ul id="questions-block">' + questions + '</ul>';

    return html;
  };

  Inquirer.prototype.questionProvider = function() {
    var self = this;
    return function(event) {
      self.methods.update($(event.target).data('link'));
    }
  };

  $.fn.extend({
    inquirer: function() {
      return new Inquirer(this, arguments);
    }
  });
})(jQuery);

$('#wrapper').inquirer();