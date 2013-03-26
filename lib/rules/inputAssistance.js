var Rule = require('../rule').Rule;

var inputAssistance = {
  fieldsetHasLegend: new Rule({
    name:    'Each fieldset element should contain a legend element',

    message: 'Please add a legend element inside of the fieldset tag',

    ruleUrl: '',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      dom.$('fieldset').each(function(index, item){

        if (!dom.$(this).find('legend')) {
          reporter.error(that.message, 0, that.name);

          throw dom.$(item).parent().html();
        }
      });
    }
  }),

  labelWithoutElements: new Rule({
    name:    'The label element should not encapsulate select and textarea elements',

    message: 'Please remove the select or textarea elements from the label',

    ruleUrl: '',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      dom.$('label').each(function(index, item){

        if (!dom.$(this).find('textarea')) {
          reporter.error(that.message, 0, that.name);

          throw dom.$(item).parent().html();
        } else {
          if (!dom.$(this).find('select')) {
            reporter.error(that.message, 0, that.name);

            throw dom.$(item).parent().html();
          }
        }
      });
    }
  }),
};

module.exports = inputAssistance;
