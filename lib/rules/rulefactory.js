var Rule = require('../rule');

/**
 * RuleFactory object.
 * Decouples rule creation from ArialLinter
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
        genericRule = new Rule.Rule(Rule.createElementRule({
          element: 'u',
          ruleUrl: 'http://oaa-accessibility.org/rule/71/'
        }));

        this.rulesMap[type] = genericRule;
      break;

      case 'ielement':
        genericRule = new Rule.Rule(Rule.createElementRule({
          element: 'i',
          ruleUrl: 'http://oaa-accessibility.org/rule/70/'
        }));

        this.rulesMap[type] = genericRule;
      break;

      case 'fontelement':
        genericRule = new Rule.Rule(Rule.createElementRule({
          element: 'font',
          ruleUrl: 'http://oaa-accessibility.org/rule/67/'
        }));

        this.rulesMap[type] = genericRule;
      break;

      case 'blinkelement':
        genericRule = new Rule.Rule(Rule.createElementRule({
          element: 'blink',
          ruleUrl: 'http://oaa-accessibility.org/rule/68/'
        }));

        this.rulesMap[type] = genericRule;
      break;

      case 'marqueeelement':
        genericRule = new Rule.Rule(Rule.createElementRule({
          element: 'marquee',
          ruleUrl: 'http://oaa-accessibility.org/rule/68/'
        }));

        this.rulesMap[type] = genericRule;
      break;

      case 'beelement':
        genericRule = new Rule.Rule(Rule.createElementRule({
          element: 'b',
          ruleUrl: 'http://oaa-accessibility.org/rule/69/'
        }));

        this.rulesMap[type] = genericRule;
      break;

      default:
        this.rulesMap[type] = require('./' + type);
      break;
    }
  }

  return this.rulesMap[type];
};

module.exports = new RuleFactory();