/*
 * arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2013 Globait UI Developers
 * Licensed under the MIT license.
 */

var jsdom = require('jsdom');
var RuleFactory = require('./rulefactory');
var Reporter = require('./reporter');


var ArialLinter = function() {};

ArialLinter.prototype = (function() {
  'use strict';

  return {
    // uri can also be a string containing html
    initialize: function(uri, callback) {
      var that   = this;
      this.dom   = undefined;
      this.rules = [];
      this.Reporter = Reporter;
      this.formatters = {};

      // Add rules
      this.rules.push(RuleFactory.makeRule('validalttext'));
      this.rules.push(RuleFactory.makeRule('frametitle'));
      this.rules.push(RuleFactory.makeRule('htmllang'));
      this.rules.push(RuleFactory.makeRule('belement'));
      this.rules.push(RuleFactory.makeRule('blinkelement'));
      this.rules.push(RuleFactory.makeRule('marqueeelement'));
      this.rules.push(RuleFactory.makeRule('fontelement'));
      this.rules.push(RuleFactory.makeRule('ielement'));
      this.rules.push(RuleFactory.makeRule('uelement'));

      // Add formatters
      this.addFormatter(require('./formatters/text'));

      jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window) {
        if (!err) {
          that.dom = window;
          callback();
        } else {
          console.log('Error on jsdom.env: ' + err);
          throw 'Error: ' + uri + ' cant be accessed.';
        }
      });
    },

    addFormatter: function(formatter) {
      this.formatters[formatter.id] = formatter;
    },

    getFormatter: function(formatId){
      return this.formatters[formatId];
    },

    /**
     * Formats the results in a particular format for a single file.
     * @param {Object} result The results returned from CSSLint.verify().
     * @param {String} filename The filename for which the results apply.
     * @param {String} formatId The name of the formatter to use.
     * @param {Object} options (Optional) for special output handling.
     * @return {String} A formatted string for the results.
     * @method format
     */
    format: function(results, filename, formatId, options) {
        var formatter = this.getFormatter(formatId),
            result = null;

        if (formatter){
            result = formatter.startFormat();
            result += formatter.formatResults(results, filename, options || {});
            result += formatter.endFormat();
        }

        return result;
    },

    getDom: function() {
      return this.dom;
    },

    evaluate: function() {
      var indexOfRules = this.rules.length;
      this.Reporter.initialize();

      for (var x = 0; x < indexOfRules; x++){
        this.rules[x].applyRule(this.getDom(), this.Reporter);
      }

      if (!this.Reporter.hasMessages()) {
        return true;
      } else {
        var report = this.format(this.Reporter.getMessages(), this.getDom(), 'text');

        console.log(report);

        return false;
      }
    }
  };
})();


exports.ArialLinter = ArialLinter;
