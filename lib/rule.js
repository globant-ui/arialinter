/*
 * arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2013 Globait UI Developers
 * Licensed under the MIT license.
 */

'use strict';

var RuleClass = function(name, message, callback){
  this.name     = name;
  this.callback = callback;
  this.message  = message;
};

RuleClass.prototype.applyRule = function(dom){
  try{
    this.callback(dom);

    return true;
  }
  catch(e){
    return false;
  }

  return false;
};

RuleClass.prototype.getName = function(){
  return this.name;
};

RuleClass.prototype.getMessage = function(){
  return this.message;
};

exports.RuleClass = RuleClass;