(function() {
  'use strict';

  module.exports = {
    //format information
    id: 'json',

    /**
     * Return content to be printed before all file results.
     * @return {String} to prepend before all results
     */
    startFormat: function() {
      return '';
    },

    /**
     * Return content to be printed after all file results.
     * @return {String} to append after all results
     */
    endFormat: function() {
      return '';
    },

    formatResults: function(messages, filename, options) {
      var output = '';

      /**
       * Capitalize and return given string.
       * @param str {String} to capitalize
       * @return {String} capitalized
       */
      var capitalize = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

      if (messages.length === 0) {
        return '{ "errors": [] }';
      }

      var len = messages.length;

      output += '{ "errors": [';

      for (var x = 0; x < len; x++) {
        output += '{ "type": "' + capitalize(messages[x].type) + '", "rule": "';
        output += capitalize(messages[x].rule.name) + '", "message": "' + capitalize(messages[x].rule.message);
        if(options.printElement && messages[x].element) {
          output += '", "element": "' + messages[x].element;
        }
        output+= '" }';
        if (x < (len - 1)) {
          output += ',';
        }
      }
      output += ']}';

      return output;
    }
  };
}());
