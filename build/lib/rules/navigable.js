(function() {
  var Rule = require('../rule');

  module.exports = {
    frameTitleAttr: new Rule({
      name:    'Frame must have title attr',

      message: 'Please add title attribute to this frame',

      ruleurl: 'http://oaa-accessibility.org/rule/10/',

      level: 'A',

      template: true,

      callback: function(dom, reporter) {
        dom.$('frame').each(function(index, item) {
          if (!dom.$(this).attr('title')) {
            throw {
              reportType: 'error',
              el: dom.$(item).parent().html()
            };
          }
        });

        dom.$('iframe').each(function(index, item) {
          if (!dom.$(this).attr('title')) {
            throw {
              reportType: 'error',
              el: dom.$(item).parent().html()
            };
          }
        });
      }
    }),

    frameUniqueTitle: new Rule({
      name:    'Title attributes for frames must be unique',

      message: 'The title attribute must be unique for all the frames',

      ruleurl: 'http://oaa-accessibility.org/rule/11/',

      level: 'A',

      template: true,

      callback: function(dom, reporter) {
        var verifyTitleAttr = function(element, dom) {
          var s = [];

          dom.$(element).each(function(index, item) {
            var e = dom.$(this).attr('title');
            if (s.indexOf(e) === -1) {
              s.push(e);
            } else {
              throw {
                reportType: 'error',
                el: dom.$(item).parent().html()
              };
            }
          });
        };

        verifyTitleAttr('frame', dom);
        verifyTitleAttr('iframe', dom);
      }
    }),

    framesNotHiddenOrEmpty: new Rule({
      name:    'Frames should not be hidden or empty',

      message: 'Frame must always be visible and contain something',

      ruleUrl: 'http://oaa-accessibility.org/rule/12/',

      level: 'AA',

      template: true,

      callback: function(dom, reporter) {
        var frameNotHidden = function(element, dom) {
          dom.$(element).each(function() {
            var e = dom.$(this).css('display');
            if (e === 'none') {
              throw {
                reportType: 'error',
                el: dom.$(this).parent().html()
              };
            }
          });
        };

        frameNotHidden('frame', dom);
        frameNotHidden('iframe', dom);
      }
    })
  };
}());
