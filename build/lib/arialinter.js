/*
 * arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2013 Globait UI Developers
 * Licensed under the MIT license.
 */

(function() {
  'use strict';

  var _ = require('lodash');
  var jsdom = require('jsdom');
  var RuleRegistry = require('./ruleregistry');
  var Reporter = require('./reporter');

  var AriaLinter = {

    initialize: function(uri, callback) {
      var that = this;
      this.dom = null;
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

      RuleRegistry.loadRules('adaptable');
      RuleRegistry.loadRules('distinguishable');
      RuleRegistry.loadRules('headingsAndLabels');
      RuleRegistry.loadRules('inputAssistance');
      RuleRegistry.loadRules('linkPurpose');
      RuleRegistry.loadRules('navigable');
      RuleRegistry.loadRules('pageTitled');
      RuleRegistry.loadRules('readable');
      RuleRegistry.loadRules('textAlternatives');
      RuleRegistry.loadRules('element');

      this.rules = _.values(RuleRegistry.rulesMap);
    },

    getRules: function() {
      var len = this.rules.length;
      var r = [];

      for (var x = 0; x < len; x++) {
        r.push(this.rules[x].id + '. Level: ' + this.rules[x].level + '. Template: ' + this.rules[x].template);
      }

      return r;
    },

    addFormatter: function(formatter) {
      this.formatters[formatter.id] = formatter;
    },

    getFormatter: function(formatId) {
      return this.formatters[formatId];
    },

    format: function(results, filename, formatId, options) {
      var formatter = this.getFormatter(formatId),
        result = null;

      if (formatter) {
        result = formatter.startFormat();
        result += formatter.formatResults(results, filename, options || {});
        result += formatter.endFormat();
      }

      return result;
    },

    getDom: function() {
      return this.dom;
    },

    getReport: function(format, filename) {
      return this.format(this.Reporter.getMessages(), filename, format);
    },

    getErrorsFound: function(format) {
      return this.Reporter.getMessages().length;
    },

    calculateRulesToApply: function(options) {
      var rulesCriteria;
      var basicCriteria;
      var result;

      if (!options) {
        return this.rules;
      }

      basicCriteria = _.pick(options, 'level', 'template');
      result = _.where(this.rules, basicCriteria);

      // console.log('First rule filter ' + JSON.stringify(_.pluck(result, 'id')));
      rulesCriteria = options.rules;
      for (var ruleId in rulesCriteria) {
        if (rulesCriteria.hasOwnProperty(ruleId)) {
          var ruleIndex = _.findIndex(result, {
            id: ruleId
          });
          if (rulesCriteria[ruleId] && ruleIndex === -1) {
            result.push(RuleRegistry.getRule(ruleId));
          }
          if (!rulesCriteria[ruleId] && ruleIndex !== -1) {
            result.splice(ruleIndex, 1);
          }
        }
      }

      //console.log('Second rule filter ' + JSON.stringify(_.pluck(result, 'id')));

      return result;
    },

    evaluate: function(options) {
      this.Reporter.initialize();

      var rulesToApply = this.calculateRulesToApply(options);

      for (var i = 0; i < rulesToApply.length; i++) {
        rulesToApply[i].applyRule(this.getDom(), this.Reporter);
      }

      return !this.Reporter.hasMessages();
    }
  };

  module.exports = AriaLinter;

})();
