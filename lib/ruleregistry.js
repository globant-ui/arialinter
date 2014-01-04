var Rule = require('./rule').Rule;

/**
 * RuleRegistry object.
 * Decouples rule storage from AriaLinter
 */

function RuleRegistry() {
  'use strict';

  this.rulesMap = {};

  this.rulesMap['null'] = new Rule({
    id: 'null',
    name: 'Null Rule',
    callback: function() {
      console.log('Error: Null rule cannot be applied');
    }
  });
}

RuleRegistry.prototype.loadRules = function(guideline) {
  'use strict';

  var rules = require('./rules/' + guideline)

  for (var key in rules) {
    if (rules.hasOwnProperty(key)) {
      rules[key].id = key;
      this.rulesMap[key] = rules[key];
    }
  }
};

RuleRegistry.prototype.getRule = function(id) {
  'use strict';
  return this.rulesMap.hasOwnProperty(id) ? this.rulesMap[id] : this.ruleMap['null'];
};

module.exports = new RuleRegistry();
