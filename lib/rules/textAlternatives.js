var Rule = require('../rule').Rule;

var textAlternatives = {
  validAltText: new Rule({
    name:    'All img must have alt',

    message: 'Please add the alt attribute to this image',

    ruleUrl: 'http://oaa-accessibility.org/rule/26/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      dom.$('img').each(function() {
        if (!dom.$(this).attr('alt')) {
          reporter.error(that.message, 0, that.name);

          throw dom.$(this).parent().html();
        }
      });
    }
  }),

  imgFileNotAltText: new Rule({
    name:    'Image file name is not valid alt text',

    message: 'The alt attribute of an image cant be an image file',

    ruleUrl: 'http://oaa-accessibility.org/rule/27/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var r = new RegExp('^.*\\.(jpg|bmp|jpeg|jfif|gif|png|tif|tiff)$');


      dom.$('img').each(function() {
        var alt = dom.$(this).attr('alt');

        if (alt) {
          if (r.exec(alt.toLowerCase())) {
            reporter.error(that.message, 0, that.name);

            throw dom.$(this).parent().html();
          }
        }
      });
    }
  }),

  lengthOfAlt: new Rule({
    name:    'If an image has an alt or title attribute, it should not have a presentation role',

    message: 'Remove the presentation role from the img',

    ruleUrl: 'http://oaa-accessibility.org/rule/31/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      dom.$('img').each(function() {
        var alt  = dom.$(this).attr('alt');
        var role = dom.$(this).attr('role');

        if (alt) {
          if (role.toLowerCase() === 'presentation') {
            reporter.error(that.message, 0, that.name);
            throw dom.$(this).parent().html();
          }
        }
      });
    }
  }),

};

module.exports = textAlternatives;