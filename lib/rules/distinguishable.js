// Guideline 1.4 Distinguishable
// Rule 16 not implemented.

var Rule = require('../rule').Rule;
var Color = require('color');

var distinguishable = {
  contrastMinimum: new Rule({
    name:    'Color contrast ratio must be > 3 for large text',

    message: 'The contrast between the colour of text and its background for the element is not sufficient to meet WCAG2.0.',

    ruleUrl: 'http://oaa-accessibility.org/rule/3/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      var getInheritedColor = function(dom, that, property) {
        dom.$(that).parents().each( function() {
          var bc = dom.$(this).css('background-color');
          if (bc === 'transparent') {
            return getInheritedColor(dom, this, property);
          } else {
            return bc;
          }
        });
      };

      dom.$('h1').each(function() {
        var bg = new Color(dom.$(this).parent().css('background-color'));
        var fg = new Color(dom.$(this).css('color'));

        var L1 = bg.luminosity();
        var L2 = fg.luminosity();

        var ratio = Math.round((Math.max(L1, L2) + 0.05)/(Math.min(L1, L2) + 0.05)*10)/10;

        if (ratio <= 3) {
          reporter.error(that.message, 0, that.name);

          throw dom.$(this).parent().html();
        }
      });
    }
  })
};

module.exports = distinguishable;