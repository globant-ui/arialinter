/**
 * http://www.openajax.org/member/wiki/Accessibility_-_WCAG20_Validation_Rules
 * Guideline 2.2 - Rule 25
 */

var Rule = require('../rule').Rule;

exports.blinkElement = new Rule('No blink or marquee elements', 'You cant use blink or marquee elements', function(dom) {
  'use strict';

  dom.$('blink').each(function(index, item){
    throw dom.$(item).parent().html();
  });

  dom.$('marquee').each(function(index, item){
    throw dom.$(item).parent().html();
  });
});