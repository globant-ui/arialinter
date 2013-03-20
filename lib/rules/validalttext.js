/**
 * http://oaa-accessibility.org/rules/
 * Rule 26
 */

var Rule = require('../rule').Rule;

module.exports = new Rule({
  name:    'All img must have alt',

  message: 'Please add the alt attribute to this image',

  ruleUrl: 'http://oaa-accessibility.org/rule/26/',

  callback: function(dom, reporter) {
    'use strict';

    var that = this;

    dom.$('img').each(function() {
      if (!dom.$(this).attr('alt')) {
        reporter.error(that.message, 0, that.name);

        throw dom.$(this).parent().html();
      }
    });
  }
});