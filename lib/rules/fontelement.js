/**
 * http://oaa-accessibility.org/rules/
 * Rule 67
 */

var Rule = require('../rule').Rule;

exports.fontElement = new Rule({
  name:    'Do not use font element',
  message: 'Please remove the font element',
  ruleUrl: 'http://oaa-accessibility.org/rule/67/',
  callback: function(dom) {
    'use strict';

    dom.$('font').each(function(index, item){
      throw dom.$(item).parent().html();
    });
  }
});