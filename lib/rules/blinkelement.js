/**
 * http://oaa-accessibility.org/rules/
 * Rule 68
 */

var Rule = require('../rule').Rule;

module.exports = new Rule({
  name:    'No blink or marquee elements',

  message: 'You cant use blink or marquee elements',

  ruleUrl: 'http://oaa-accessibility.org/rule/68/',

  callback: function(dom) {
    'use strict';

    dom.$('blink').each(function(index, item){
      throw dom.$(item).parent().html();
    });

    dom.$('marquee').each(function(index, item){
      throw dom.$(item).parent().html();
    });
  }
});