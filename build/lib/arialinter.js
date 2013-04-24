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


var AriaLinter = function() {};

AriaLinter.prototype = (function() {
  'use strict';

  return {
    // uri can also be a string containing html
    initialize: function(uri, callback) {
      var that   = this;
      this.dom   = null;
      this.Reporter = Reporter;
      this.formatters = {};

      // Add rules
      this.initRules();

      // Add formatters
      this.addFormatter(require('./formatters/text'));
      this.addFormatter(require('./formatters/json'));

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

    initRules: function() {
      this.rules = [];

      var getRulesFromGuideline = function(rules) {
        var r = [];

        for (var key in rules) {
          if (rules.hasOwnProperty(key)) {
            r.push(rules[key]);
          }
        }

        return r;
      };

      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('adaptable')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('distinguishable')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('headingsAndLabels')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('inputAssistance')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('linkPurpose')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('navigable')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('pageTitled')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('readable')));
      this.rules.push.apply(this.rules, getRulesFromGuideline(RuleFactory.makeRule('textAlternatives')));

      this.rules.push(RuleFactory.makeRule('belement'));
      this.rules.push(RuleFactory.makeRule('blinkelement'));
      this.rules.push(RuleFactory.makeRule('marqueeelement'));
      this.rules.push(RuleFactory.makeRule('fontelement'));
      this.rules.push(RuleFactory.makeRule('ielement'));
      this.rules.push(RuleFactory.makeRule('uelement'));
    },

    getRules: function() {
      var len = this.rules.length;
      var r = [];

      for (var x = 0; x < len; x++) {
        r.push(this.rules[x].name + ' .Level: ' + this.rules[x].level + ' .Template: ' + this.rules[x].template);
      }

      return r;
    },

    addFormatter: function(formatter) {
      this.formatters[formatter.id] = formatter;
    },

    getFormatter: function(formatId) {
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

    getReport: function(format) {
      return this.format(this.Reporter.getMessages(), this.getDom(), format);
    },

    evaluate: function(options) {
      var indexOfRules = this.rules.length;
      this.Reporter.initialize();

      for (var x = 0; x < indexOfRules; x++) {
        if (options) {
          if ((options.level) && (!options.template) && (options.level === this.rules[x].level)) {
            // Apply only for levels
            this.rules[x].applyRule(this.getDom(), this.Reporter);
          } else {
            if ((options.template) && (!options.level) && (options.template === this.rules[x].template)) {
              //apply only for templates
              this.rules[x].applyRule(this.getDom(), this.Reporter);
            } else {
              if ((options.template) && (options.level) &&
                  (options.template === this.rules[x].template) &&
                  (options.level === this.rules[x].level)) {
                // For templates with levels
                this.rules[x].applyRule(this.getDom(), this.Reporter);
              }
            }
          }
        } else {
          // Apply all the rules
          this.rules[x].applyRule(this.getDom(), this.Reporter);
        }
      }

      if (!this.Reporter.hasMessages()) {
        return true;
      } else {
        return false;
      }
    }
  };
})();


exports.AriaLinter = AriaLinter;
