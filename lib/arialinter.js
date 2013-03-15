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

var ALinter = function() { };

ALinter.prototype = (function(){

  return {
    // uri can also be a string containing html
    initialize: function(uri, callback) {
        var that = this;
        this.dom = undefined;
        this.rules = rule.Rules;

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

    getDom: function(){
      return this.dom;
    },

    evaluate: function(){
      var result       = true,
          indexOfRules = this.rules.length;

      for (var x = 0; x < indexOfRules; x++){
        if (! this.rules[x].applyRule(this.getDom())){
          console.log('Rule failed: ' + this.rules[x].getMessage());
          result = false;
        }
      };

      return result;
    }
  };
})();

exports.ALinter = ALinter;
