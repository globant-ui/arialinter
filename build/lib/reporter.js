/**
 * An instance of Report is used to report results of the verification back to the main lib.
 */

(function() {
  'use strict';

  function Reporter() {
    this.messages = [];
  }

  Reporter.prototype.initialize = function() {
      this.messages = [];
  };

  Reporter.prototype.error = function(element, rule) {
    this.messages.push({
      type: 'error',
      element: element,
      rule: rule
    });
  };

  Reporter.prototype.info = function(element, rule) {
    this.messages.push({
      type: 'info',
      element: element,
      rule: rule
    });
  };

  Reporter.prototype.getMessages = function() {
    return this.messages;
  };

  Reporter.prototype.hasMessages = function() {
    return (this.messages.length !== 0);
  };

  Reporter.prototype.print = function() {
    var len = this.messages.length;

    for (var i = 0; i < len; i++) {
      console.log(this.element);
      console.log(this.messages[i].message);
    }
  };

  module.exports = new Reporter();

}());
