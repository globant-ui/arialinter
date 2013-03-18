/**
 * http://oaa-accessibility.org/rules/
 * Rule 70
 */

var Rule = require('../rule').Rule;

module.exports = new Rule({
  name:    'Do not use i element',

  message: 'Please remove the i element',

  ruleUrl: 'http://oaa-accessibility.org/rule/70/',

  callback: function(dom) {
    'use strict';

    dom.$('i').each(function(index, item){
      throw dom.$(item).parent().html();
    });
  }
});