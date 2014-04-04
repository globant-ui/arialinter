(function() {
  'use strict';
  var Rule = require('../rule');

  module.exports = {
    htmlLang: new Rule({
      name:    'All pages should have lang attr in html tag',

      message: 'Please add the lang attribute to the html tag',

      ruleUrl: 'http://oaa-accessibility.org/rule/34/',

      level: 'A',

      template: false,

      callback: function(dom, reporter) {
        if (!dom.$('html').attr('lang')) {
          throw {
            reportType: 'error',
            el: dom.$('html').parent().html()
          };
        }
      }
    }),

    validLangAttr: new Rule({
      name:    'Lang attribute on html element must have a valid two-character language code',

      message: 'Please, ensure that the lang attribute of the html tag is valid',

      ruleUrl: 'http://oaa-accessibility.org/rule/35/',

      level: 'A',

      template: false,

      callback: function(dom, reporter) {
        if (dom.$('html').attr('lang').length !== 2) {
          throw {
            reportType: 'error',
            el: dom.$('html').attr('lang')
          };
        }
      }
    })

  };
}());
