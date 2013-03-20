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

      this.rules.push(RuleFactory.makeRule('validalttext'));
      this.rules.push(RuleFactory.makeRule('frametitle'));
      this.rules.push(RuleFactory.makeRule('htmllang'));

      this.rules.push(RuleFactory.makeRule('belement'));
      this.rules.push(RuleFactory.makeRule('blinkelement'));
      this.rules.push(RuleFactory.makeRule('marqueeelement'));
      this.rules.push(RuleFactory.makeRule('fontelement'));
      this.rules.push(RuleFactory.makeRule('ielement'));
      this.rules.push(RuleFactory.makeRule('uelement'));

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

    getDom: function() {
      return this.dom;
    },

    evaluate: function() {
      var indexOfRules = this.rules.length;
      this.Reporter.initialize();

      for (var x = 0; x < indexOfRules; x++){
        this.rules[x].applyRule(this.getDom(), this.Reporter);
      }

      if (!this.Reporter.hasErrors()) {
        return true;
      } else {
        this.Reporter.print();

        return false;
      }
    }
  };
})();


exports.ArialLinter = ArialLinter;
