/**
 * http://www.openajax.org/member/wiki/Accessibility_-_WCAG20_Validation_Rules
 * Guideline 4.1 - Rule 60
 */

var Rule = require('../rule').Rule;

module.exports = new Rule('Do not use u element', 'Please remove the u element', function(dom) {
  'use strict';
  dom.$('u').each(function(index, item){
    throw dom.$(item).parent().html();
  });
});