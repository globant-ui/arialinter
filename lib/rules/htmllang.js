/**
 * http://oaa-accessibility.org/rules/
 * Rule 34
 */

var Rule = require('../rule').Rule;

exports.htmlLang = new Rule({
  name:    'All pages should have lang attr in html tag',
  message: 'Please add the lang attribute to the html tag',
  ruleUrl: 'http://oaa-accessibility.org/rule/34/',
  callback: function(dom) {
    'use strict';

    if (!dom.$('html').attr('lang')) {
      throw dom.$('html').parent().html();
    }
  }
});
