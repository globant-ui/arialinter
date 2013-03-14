/*
 * arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2013 Globait UI Developers
 * Licensed under the MIT license.
 */

'use strict';

var jsdom = require('jsdom');
var rule  = require('./rule');

var ALinterClass = function() { };

ALinterClass.prototype = (function(){

  return {
    // uri can also be a string containing html
    initialize: function(uri, callback) {
        var that = this;
        this.dom = undefined;
        this.Rules = [];

        jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window){
          if (!err){
            that.dom = window;

            callback();
          }
          else{
            console.log('Error on jsdom.env: ' + err);
            throw 'Error: ' + uri + ' cant be accessed.';
          }
        });
    },

    addRule: function(ruleName, ruleError, callback){
      var ruleImages = new rule.RuleClass(ruleName, ruleError, callback);

      this.Rules.push(ruleImages);
    },

    getDom: function(){
      return this.dom;
    },

    evaluate: function(){
      var result = true;

      for (var x = 0; x < this.Rules.length; x++){
        console.log('');
        console.log('--------> Starting with rule: ' + this.Rules[x].getName())

        if (this.Rules[x].applyRule(this.getDom())){
          console.log('Success applying rule: ' + this.Rules[x].getName());
        }
        else{
          console.log('Error applying rule: ' + this.Rules[x].getName() + '.');
          console.log('Message:' + this.Rules[x].getMessage());

          result = false;
        }
      };

      return result;
    }
  };
})();

exports.ALinterClass = ALinterClass;
