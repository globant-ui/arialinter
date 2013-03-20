/**
 * An instance of Report is used to report results of the verification back to the main lib.
 */
function Reporter(){
  this.messages = [];
}

Reporter.prototype = {

  //restore constructor
  constructor: Reporter,

  initialize: function() {
    this.messages = [];
  },

  error: function(message, line, rule){
    this.messages.push({
      type    : "error",
      line    : line,
      message : message,
      rule    : rule || {}
    });
  },

  info: function(message, line, rule){
    this.messages.push({
      type    : "info",
      line    : line,
      message : message,
      rule    : rule
    });
  },

  hasErrors: function() {
    return (this.messages.length !== 0);
  },

  print: function() {
    var len = this.messages.length;

    for (var x = 0; x < len; x++){
      console.log(this.messages[x]);
    }
  }
};

module.exports = new Reporter();