/**
 * http://www.openajax.org/member/wiki/Accessibility_-_WCAG20_Validation_Rules
 * Guideline 3.1 - Rule 45
 */

var Rule = require('../rule').Rule;

module.exports = new Rule(
  'All pages should have lang attr in html tag',
  'Please add the lang attribute to the html tag',
  function(dom) {
    'use strict';
    if (!dom.$('html').attr('lang')) {
      throw dom.$('html').parent().html();
    }
  }
);
