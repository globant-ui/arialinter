/*
 * arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2013 Globait UI Developers
 * Licensed under the MIT license.
 */

(function() {
  'use strict';

  function Rule(options) {
    this.id       = options.id;
    this.name     = options.name;
    this.callback = options.callback;
    this.message  = options.message;
    this.ruleUrl  = options.ruleUrl;
    this.level    = options.level;
    this.template = options.template;
  };

  Rule.prototype.applyRule = function(dom, reporter) {
    try {
      this.callback(dom);
      return true;
    }
    catch(e) {
      if (e && e.reportType) {
        reporter[e.reportType](e.el, this);
      }
      return e;
    }
  };

  Rule.prototype.getName = function() {
    return this.name;
  };

  Rule.prototype.getMessage = function() {
    return this.message;
  };

  module.exports = Rule;

}());
