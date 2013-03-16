/*
 * arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2013 Globait UI Developers
 * Licensed under the MIT license.
 */

var jsdom = require('jsdom');


var ArialLinter = function() {};

ArialLinter.prototype = (function(){
  'use strict';

  return {
    // uri can also be a string containing html
    initialize: function(uri, callback) {
      var that = this;
      this.dom = undefined;
      this.rules = [];

      this.rules.push(require('./rules/validalttext').imgAltText);
      this.rules.push(require('./rules/blinkelement').blinkElement);
      this.rules.push(require('./rules/htmllang').htmlLang);
      this.rules.push(require('./rules/frametitle').frameTitle);
      this.rules.push(require('./rules/ielement').iElement);
      this.rules.push(require('./rules/uelement').uElement);
      this.rules.push(require('./rules/fontelement').fontElement);
      this.rules.push(require('./rules/belement').bElement);

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
      var result = true,
          indexOfRules = this.rules.length;

      for (var x = 0; x < indexOfRules; x++){
        var r = this.rules[x].applyRule(this.getDom());

        if (typeof r !== 'boolean'){
          console.log('Rule failed: ' + this.rules[x].getMessage() + '. In section: ');
          console.log(r);
          result = false;
        }
      }

      return result;
    }
  };
})();

exports.ArialLinter = ArialLinter;
