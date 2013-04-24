var Rule = require('./rule').Rule;

/**
 * RuleFactory object.
 * Decouples rule creation from AriaLinter
 */

/**
 * Given an element, generates a function that checks that that element is not in the dom.
 */
var createGenericCallback = function(element) {
  'use strict';

  return function(dom, reporter) {
    var that = this;

    dom.$(element).each(function(index, item){
      reporter.error(that.message, 0, that.name);

      throw dom.$(item).parent().html();
    });
  };
};

/**
 * Creates an options json that stores the options for a generic rule.
 */
var createElementRule = function(options) {
  'use strict';
  return {
    element: options.element,
    name:    'Do not use ' + options.element + ' element',
    message: 'Please remove the ' + options.element + ' element',
    ruleUrl:  options.ruleUrl,
    level:    options.level,
    template: true,
    callback: createGenericCallback(options.element)
  };
};

/**
 * RuleFactory function constructor
 * @constructor
 */
function RuleFactory() {
  'use strict';
  this.rulesMap = {};
}

/**
 * Make method to create rule objects
 * @param  {string} type String specifying the rule type
 * @return {object}      a rule object
 */
RuleFactory.prototype.makeRule = function(type) {
  'use strict';

  //If rule is not already in the map
  //then create it and store it
  if (!this.rulesMap.hasOwnProperty(type)) {
    var genericRule;

    switch(type){
    case 'uelement':
      genericRule = new Rule(createElementRule({
        element: 'u',
        ruleUrl: 'http://oaa-accessibility.org/rule/71/',
        level: 'AA'
      }));

      this.rulesMap[type] = genericRule;
      break;

    case 'ielement':
      genericRule = new Rule(createElementRule({
        element: 'i',
        ruleUrl: 'http://oaa-accessibility.org/rule/70/',
        level: 'AA'
      }));

      this.rulesMap[type] = genericRule;
      break;

    case 'fontelement':
      genericRule = new Rule(createElementRule({
        element: 'font',
        ruleUrl: 'http://oaa-accessibility.org/rule/67/',
        level: 'AA'
      }));

      this.rulesMap[type] = genericRule;
      break;

    case 'blinkelement':
      genericRule = new Rule(createElementRule({
        element: 'blink',
        ruleUrl: 'http://oaa-accessibility.org/rule/68/',
        level: 'AA'
      }));

      this.rulesMap[type] = genericRule;
      break;

    case 'marqueeelement':
      genericRule = new Rule(createElementRule({
        element: 'marquee',
        ruleUrl: 'http://oaa-accessibility.org/rule/68/',
        level: 'A'
      }));

      this.rulesMap[type] = genericRule;
      break;

    case 'belement':
      genericRule = new Rule(createElementRule({
        element: 'b',
        ruleUrl: 'http://oaa-accessibility.org/rule/69/',
        level: 'AA'
      }));

      this.rulesMap[type] = genericRule;
      break;

    default:
      this.rulesMap[type] = require('./rules/' + type);
      break;
    }
  }

  return this.rulesMap[type];
};


module.exports = new RuleFactory();
