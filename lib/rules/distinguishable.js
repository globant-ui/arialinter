// Guideline 1.4 Distinguishable

var Rule = require('../rule').Rule;

var distinguishable = {
  contrastMinimum: new Rule({
    name:    'Color contrast ratio must be > 3 for large text',

    message: 'The contrast between the colour of text and its background for the element is not sufficient to meet WCAG2.0.',

    ruleUrl: 'http://oaa-accessibility.org/rule/3/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      dom.$('table').each(function() {
        if (!dom.$(this).attr('summary')) {
          reporter.error(that.message, 0, that.name);

          throw dom.$(this).parent().html();
        }
      });
    }
  })
};

module.exports = distinguishable;