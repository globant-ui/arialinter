/*
 * arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2013 Globait UI Developers
 * Licensed under the MIT license.
 */

var Rule = function(options) {
  'use strict';

  this.name     = options.name;
  this.callback = options.callback;
  this.message  = options.message;
  this.ruleUrl  = options.ruleUrl;
};

Rule.prototype.applyRule = function(dom) {
  'use strict';

  try {
    this.callback(dom);
    return true;
  }
  catch(e) {
    return e;
  }
};

Rule.prototype.getName = function() {
  'use strict';

  return this.name;
};

Rule.prototype.getMessage = function() {
  'use strict';

  return this.message;
};

// Given an element, generates a function that checks that that element is not in the dom.
var createGenericCallback = function(element){
  return function(dom){
    'use strict';

    dom.$(element).each(function(index, item){
      throw dom.$(item).parent().html();
    });
  };
};

// Creates an options json that stores the options for a generic rule.
exports.createElementRule = function(options){
  return {
    element: options.element,
    name:    'Do not use ' + options.element + ' element',
    message: 'Please remove the ' + options.element + ' element',
    ruleUrl:  options.ruleUrl,
    callback: createGenericCallback(options.element)
  };
};

exports.Rule = Rule;