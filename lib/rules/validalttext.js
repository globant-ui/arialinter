/**
 * http://www.openajax.org/member/wiki/Accessibility_-_WCAG20_Validation_Rules
 * Guideline 1.1 - Rule 1
 */

var Rule = require('../rule').Rule;

module.exports = new Rule('All img must have alt', 'Please add the alt attribute to this image', function(dom) {
  'use strict';
  dom.$('img').each(function() {
    if (!dom.$(this).attr('alt')) {
      throw dom.$(this).parent().html();
    }
  });
});