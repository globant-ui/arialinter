// Guideline 1.4 Distinguishable
// Rule 16 not implemented.

var Rule = require('../rule').Rule;
var Color = require('color');

var distinguishable = {
  contrastMinimum: new Rule({
    name:    'Color contrast ratio must be > 3 for large text',

    message: 'The contrast between the colour of text and its background for the element is not sufficient to meet WCAG2.0.',

    ruleUrl: 'http://oaa-accessibility.org/rule/3/',

    level: 'A',

    template: false,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      var getInheritedProperty = function(e, property) {
        // Is current element's background color set?
        var color = e.css(property);

        if ((color !== 'rgba(0, 0, 0, 0)') && (color !== 'transparent')) {
          // if so then return that color
          return color;
        }

        // if not: are you at the body element?
        if (e.is('body')) {
          // return known 'false' value
          return false;
        } else {
          // call getBackground with parent item
          return getInheritedProperty(e.parent(), property);
        }
      };

      dom.$('h1').each(function() {
        var bg = new Color(getInheritedProperty(dom.$(this), 'background-color'));
        var fg = new Color(getInheritedProperty(dom.$(this), 'color'));

        var L1 = bg.luminosity();
        var L2 = fg.luminosity();

        var ratio = Math.round((Math.max(L1, L2) + 0.05)/(Math.min(L1, L2) + 0.05)*10)/10;
        console.log('Ratio: ' + ratio);


        if (ratio <= 3) {
          reporter.info(that.message, 0, that.name);

          throw dom.$(this).parent().html();
        }
      });
    }
  })
};

module.exports = distinguishable;