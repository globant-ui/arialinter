/**
 * http://oaa-accessibility.org/rules/
 * Rule 69
 */

var Rule = require('../rule').Rule;

module.exports = new Rule({
  name:    'Do not use b element',

  message: 'Please remove the b element',

  ruleUrl: 'http://oaa-accessibility.org/rule/69/',

  callback: function(dom) {
    'use strict';

    dom.$('b').each(function(index, item){
      throw dom.$(item).parent().html();
    });
  }
});