/**
 * http://oaa-accessibility.org/rules/
 * Rule 26
 */

var Rule = require('../rule').Rule;

exports.imgAltText = new Rule({
  name:    'All img must have alt',
  message: 'Please add the alt attribute to this image',
  ruleUrl: 'http://oaa-accessibility.org/rule/26/',
  callback: function(dom) {
    'use strict';

    dom.$('img').each(function() {
      if (!dom.$(this).attr('alt')) {
        throw dom.$(this).parent().html();
      }
    });
  }
});