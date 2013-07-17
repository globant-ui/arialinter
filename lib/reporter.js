/**
 * An instance of Report is used to report results of the verification back to the main lib.
 */
function Reporter(){
  'use strict';

  this.messages = [];
}

Reporter.prototype = {

  //restore constructor
  constructor: Reporter,

  initialize: function() {
    'use strict';
    this.messages = [];
  },

  error: function(message, line, rule) {
    'use strict';
    this.messages.push({
      type    : "error",
      line    : line,
      message : message,
      rule    : rule || {}
    });
  },

  info: function(message, line, rule) {
    'use strict';
    this.messages.push({
      type    : "info",
      line    : line,
      message : message,
      rule    : rule
    });
  },

  getMessages: function() {
    'use strict';
    return this.messages;
  },

  hasMessages: function() {
    'use strict';
    return (this.messages.length !== 0);
  },

  print: function() {
    'use strict';
    var len = this.messages.length;

    for (var x = 0; x < len; x++){
      console.log(this.messages[x]);
    }
  }
};

module.exports = new Reporter();