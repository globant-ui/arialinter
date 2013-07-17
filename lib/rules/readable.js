var Rule = require('../rule').Rule;

var readable = {
  htmlLang: new Rule({
    name:    'All pages should have lang attr in html tag',

    message: 'Please add the lang attribute to the html tag',

    ruleUrl: 'http://oaa-accessibility.org/rule/34/',

    level: 'A',

    template: false,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var el;

      if (!dom.$('html').attr('lang')) {
        el = dom.$('html').parent().html();
        reporter.error(that.message, el, that.name);

        throw el;
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
      'use strict';

      var that = this;
      var el;

      if (dom.$('html').attr('lang').length !== 2) {
        el = dom.$('html').parent().html();
        reporter.error(that.message, el, that.name);

        throw el;
      }
    }
  })

};

module.exports = readable;
