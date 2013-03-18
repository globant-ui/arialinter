/**
 * http://www.openajax.org/member/wiki/Accessibility_-_WCAG20_Validation_Rules
 * Guideline 4.1 - Rule 17
 */

var Rule = require('../rule').Rule;

module.exports = new Rule('Do not use font element', 'Please remove the font element', function(dom) {
  'use strict';

  dom.$('font').each(function(index, item){
    throw dom.$(item).parent().html();
  });
});