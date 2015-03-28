(function($, _) {
  $.fn.inquirer = function Inquired() {
    if(typeof dataArray !== 'object' || !dataArray.length) {
      throw new Error('Array of questions is missing!!!');
    }
    console.log(JSON.stringify(dataArray));
    this.append('Helo');
    return this;
  }
})(jQuery, _);

$('#wrapper').inquirer();