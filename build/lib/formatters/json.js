var jsonFormatter = {
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

  /**
   * Given CSS Lint results for a file, return output for this format.
   * @param results {Object} with error and warning messages
   * @param filename {String} relative file path
   * @param options {Object} (Optional) specifies special handling of output
   * @return {String} output for results
   */
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
      output += '{ "type": "' + capitalize(messages[x].type) + '", "rule": "' + capitalize(messages[x].rule) + '", "message": "' + capitalize(messages[x].message) + '" }';
      if (x < (len - 1)) {
        output += ',';
      }
    }
    output += ']}';

    return output;
  }
};

module.exports = jsonFormatter;