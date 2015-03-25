(function() {
  'use strict';

  var colors = require('colors');

  module.exports  = {

    id: 'text',

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
        return options.quiet ? '' : filename + ': Lint Free!';
      }

      var len = messages.length;

      output += ('* File: '.bold + filename + ' has ' + len + ' error/s.\n').red;
      for (var x = 0; x < len; x++) {
        if(options.printElement && messages[x].element ) {
          output += messages[x].element + '\n';
        }
        output += capitalize(messages[x].type).red + ': ';
        output += capitalize(messages[x].rule.name) + '\n';
        output += 'Description: '.red + capitalize(messages[x].rule.message) + '\n';
        output += 'Rule URL: '.red +  messages[x].rule.ruleUrl  + '\n';
        if (x < len) {
          output += '\n';
        }
      }

      return output;
    }
  };
}());
