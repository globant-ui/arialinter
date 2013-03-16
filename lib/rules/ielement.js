/**
 * http://www.openajax.org/member/wiki/Accessibility_-_WCAG20_Validation_Rules
 * Guideline 4.1 - Rule 59
 */

var Rule = require('../rule').Rule;

exports.iElement = new Rule('Do not use i element', 'Please remove the i element', function(dom) {
  'use strict';
  dom.$('i').each(function(index, item){
    throw dom.$(item).parent().html();
  });
});