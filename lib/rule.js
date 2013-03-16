/*
 * arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2013 Globait UI Developers
 * Licensed under the MIT license.
 */

var Rule = function(name, message, callback) {
  'use strict';
  this.name     = name;
  this.callback = callback;
  this.message  = message;
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

exports.Rule = Rule;