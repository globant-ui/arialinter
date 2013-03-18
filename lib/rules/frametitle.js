/**
 * http://www.openajax.org/member/wiki/Accessibility_-_WCAG20_Validation_Rules
 * Guideline 2.4 - Rule 26
 */

var Rule = require('../rule').Rule;

module.exports = new Rule('Frame must have title attr', 'Please add title attribute to this frame', function(dom) {
  'use strict';

  dom.$('frame').each(function(index, item){
    if (!dom.$(this).attr('title')){
      throw dom.$(item).parent().html();
    }
  });

  dom.$('iframe').each(function(index, item){
    if (!dom.$(this).attr('title')){
      throw dom.$(item).parent().html();
    }
  });
});