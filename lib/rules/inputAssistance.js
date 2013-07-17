// Guideline 3.3 - Input Assistance
// Missing rules:
// Rule 49: Each input element with type=text | password | checkbox | radio | file and each select and textarea element should either be referenced by the for attribute of a label element via its id attribute, or have a title attribute. Last updated: 2011-03-31
// Rule 53: Effective labels should be unique. Last updated: 2011-03-31
// Rule 56: Title attributes used for labeling form controls must have content. Last updated: 2011-03-31

var Rule = require('../rule').Rule;

var hasContent = function(element, dom, reporter, that) {
  'use strict';
  var el;
  dom.$(element).each(function(index, item){
    if (!dom.$(this).val() && !dom.$(this).text()) {
      el = dom.$(item).parent().html();

      reporter.error(that.message, el, that.name);

      throw dom.$(item).parent().html();
    }
  });
};

var inputAssistance = {
  fieldsetHasLegend: new Rule({
    name:    'Each fieldset element should contain a legend element',

    message: 'Please add a legend element inside of the fieldset tag',

    ruleUrl: '',

    level: 'A',

    template: true,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var el;

      dom.$('fieldset').each(function(index, item){

        if (!dom.$(this).find('legend')) {
          el = dom.$(item).parent().html();
          reporter.error(that.message, el, that.name);

          throw el;
        }
      });
    }
  }),

  labelWithoutElements: new Rule({
    name:    'The label element should not encapsulate select and textarea elements',

    message: 'Please remove the select or textarea elements from the label',

    ruleUrl: '',

    level: 'A',

    template: true,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var el;

      dom.$('label').each(function(index, item) {
        el = dom.$(item).parent().html();

        if (!dom.$(this).find('textarea')) {
          reporter.error(that.message, el, that.name);

          throw el;
        } else {
          if (!dom.$(this).find('select')) {
            reporter.error(that.message, el, that.name);

            throw el;
          }
        }
      });
    }
  }),

  inputImageHasAlt: new Rule({
    name:    'Input element of type=[image] must have an alt or a title attribute',

    message: 'Please add an alt or title attribute to the input',

    ruleUrl: '',

    level: 'A',

    template: true,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var el;

      dom.$('input[type=image]').each(function(index, item){
        if (!dom.$(this).attr('alt') && !dom.$(this).attr('title')) {
          el = dom.$(item).parent().html();
          reporter.error(that.message, el, that.name);

          throw el;
        }
      });
    }
  }),

  inputsHasValue: new Rule({
    name:    'Input elements where type=[button|submit|reset] must have a value or title attribute',

    message: 'All the inputs must have a valid value or title attribute',

    ruleUrl: '',

    level: 'AA',

    template: true,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var el;

      var inputHasValue = function(element, dom, reporter, that) {
        dom.$(element).each(function(index, item){
          if (!dom.$(this).val() && !dom.$(this).attr('title')) {
            el = dom.$(item).parent().html();
            reporter.error(that.message, el, that.name);

            throw el;
          }
        });
      };

      inputHasValue('input[type=button]', dom, reporter, that);
      inputHasValue('input[type=submit]', dom, reporter, that);
      inputHasValue('input[type=reset]',  dom, reporter, that);
    }
  }),

  buttonsHasContent: new Rule({
    name:    'Each button element must contain content',

    message: 'Please ensure that all the buttons has content inside',

    ruleUrl: '',

    level: 'A',

    template: true,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;


      hasContent(':button', dom, reporter, that);
    }
  }),

  labelTextContent: new Rule({
    name:    'Labels must have text content',

    message: 'All labels must have text content',

    ruleUrl: '',

    level: 'A',

    template: true,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;


      hasContent('label', dom, reporter, that);
    }
  }),

  legendTextContent: new Rule({
    name:    'Legends must have text content',

    message: 'All legends must have text content',

    ruleUrl: '',

    level: 'A',

    template: true,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;


      hasContent('legend', dom, reporter, that);
    }
  }),

  formUniqueId: new Rule({
    name:    'Form controls must have unique ids',

    message: 'All forms must have unique ids',

    ruleUrl: '',

    level: 'A',

    template: true,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var s = [];
      var el;


      dom.$('form').each(function(index, item){
        var e = dom.$(this).attr('id');

        if (s.indexOf(e) > -1) {
          s.push(e);
        } else {
          el = dom.$(item).parent().html();
          reporter.error(that.message, el, that.name);
          throw el;
        }
      });

    }
  })
};

module.exports = inputAssistance;
