/**
 * An instance of Report is used to report results of the verification back to the main lib.
 * @class Reporter
 * @constructor
 */
function Reporter(){

    /**
     * List of messages being reported.
     * @property messages
     * @type String[]
     */
    this.messages = [];
}

Reporter.prototype = {

    //restore constructor
    constructor: Reporter,

    /**
     * Report an error.
     * @param {String} message The message to store.
     * @param {int} line The line number.
     * @param {Object} rule The rule this message relates to.
     * @method error
     */
    error: function(message, line, rule){
        this.messages.push({
            type    : "error",
            line    : line,
            message : message,
            rule    : rule || {}
        });
    },

    /**
     * Report some informational text.
     * @param {String} message The message to store.
     * @param {int} line The line number.
     * @param {Object} rule The rule this message relates to.
     * @method info
     */
    info: function(message, line, rule){
        this.messages.push({
            type    : "info",
            line    : line,
            message : message,
            rule    : rule
        });
    }
};

module.exports = new Reporter();