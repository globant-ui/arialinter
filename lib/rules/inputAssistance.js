var Rule = require('../rule').Rule;

var inputAssistance = {
  htmlLang: new Rule({
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
  })
};

module.exports = inputAssistance;
