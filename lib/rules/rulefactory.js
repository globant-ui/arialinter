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
    this.rulesMap[type] = require('./' + type);
  }

  return this.rulesMap[type];
};

module.exports = new RuleFactory();