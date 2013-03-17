/**
 * http://oaa-accessibility.org/rules/
 * Rule 71
 */

var Rule = require('../rule').Rule;

exports.uElement = new Rule({
  name:    'Do not use u element',
  message: 'Please remove the u element',
  ruleUrl: 'http://oaa-accessibility.org/rule/71/',
  callback: function(dom) {
    'use strict';

    dom.$('u').each(function(index, item){
      throw dom.$(item).parent().html();
    });
  }
});