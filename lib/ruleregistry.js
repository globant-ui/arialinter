var Rule = require('./rule');

/**
 * RuleRegistry object.
 * Decouples rule storage from AriaLinter
 */
(function() {
  'use strict';

  function RuleRegistry() {
    this.rulesMap = {};

    this.nullRule = new Rule({
      id: 'null',
      name: 'Null Rule',
      callback: function() {
        console.log('Error: Null rule cannot be applied');
      }
    });
  }

  RuleRegistry.prototype.loadRules = function(guideline) {
    var rules = require('./rules/' + guideline)

    for (var key in rules) {
      if (rules.hasOwnProperty(key)) {
        rules[key].id = key;
        this.rulesMap[key] = rules[key];
      }
    }
  };

  RuleRegistry.prototype.getNullRule = function() {
    return this.nullRule;
  }

  RuleRegistry.prototype.getRule = function(id) {
    return this.rulesMap.hasOwnProperty(id) ? this.rulesMap[id] : this.nullRule;
  };

  module.exports = new RuleRegistry();

}());
