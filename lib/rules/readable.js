var Rule = require('../rule').Rule;

var readable = {
  htmlLang: new Rule({
    name:    'All pages should have lang attr in html tag',

    message: 'Please add the lang attribute to the html tag',

    ruleUrl: 'http://oaa-accessibility.org/rule/34/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      if (!dom.$('html').attr('lang')) {
        reporter.error(that.message, 0, that.name);

        throw dom.$('html').parent().html();
      }
    }
  }),

  validAlt: new Rule({
    name:    'Lang attribute on html element must have a valid two-character language code',

    message: 'Please, ensure that the lang attribute of the html tag is valid',

    ruleUrl: 'http://oaa-accessibility.org/rule/35/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      if (dom.$('html').attr('lang').length !== 2) {
        reporter.error(that.message, 0, that.name);

        throw dom.$('html').parent().html();
      }
    }
  })

};

module.exports = readable;
