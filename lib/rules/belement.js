/**
 * http://www.openajax.org/member/wiki/Accessibility_-_WCAG20_Validation_Rules
 * Guideline 4.1 - Rule 58
 */

var Rule = require('../rule').Rule;

exports.bElement = new Rule('Do not use b element', 'Please remove the b element', function(dom) {
  'use strict';
  dom.$('b').each(function(index, item){
    throw dom.$(item).parent().html();
  });
});