/*
 * arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2013 Globait UI Developers
 * Licensed under the MIT license.
 */

'use strict';

var Rule = function(name, message, callback){
  this.name     = name;
  this.callback = callback;
  this.message  = message;
};

Rule.prototype.applyRule = function(dom){
  try{
    this.callback(dom);

    return true;
  }
  catch(e){
    return false;
  }

  return false;
};

Rule.prototype.getName = function(){
  return this.name;
};

Rule.prototype.getMessage = function(){
  return this.message;
};

exports.Rule = Rule;