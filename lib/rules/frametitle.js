/**
 * http://oaa-accessibility.org/rules/
 * Rule 10
 */

var Rule = require('../rule').Rule;

module.exports = new Rule({
  name:    'Frame must have title attr',

  message: 'Please add title attribute to this frame',

  ruleurl: 'http://oaa-accessibility.org/rule/10/',

  callback: function(dom, reporter) {
    'use strict';

    var that = this;

    dom.$('frame').each(function(index, item){
      if (!dom.$(this).attr('title')){
        reporter.error(that.message, 0, that.name);

        throw dom.$(item).parent().html();
      }
    });

    dom.$('iframe').each(function(index, item){
      if (!dom.$(this).attr('title')){
        reporter.error(that.message, 0, that.name);

        throw dom.$(item).parent().html();
      }
    });
  }
});