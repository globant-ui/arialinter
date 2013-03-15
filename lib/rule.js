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
    return e;
  }
};

Rule.prototype.getName = function(){
  return this.name;
};

Rule.prototype.getMessage = function(){
  return this.message;
};

var rules = [],
    rule;

// Guideline 1.1 - Rule 1
rule = new Rule('All img must have alt', 'Please add the alt attribute to this image', function(dom){
  dom.$('img').each(function(){

    if (!dom.$(this).attr('alt')){
      throw dom.$(this).parent().html();
    }
  });
}); rules.push(rule);

// Guideline 2.2 - Rule 25
rule = new Rule('No blink or marquee elements', 'You cant use blink or marquee elements', function(dom){
  dom.$('blink').each(function(index, item){
    throw dom.$(item).parent().html();
  });

  dom.$('marquee').each(function(index, item){
    throw dom.$(item).parent().html();
  });
}); rules.push(rule);

// Guideline 2.4 - Rule 26
rule = new Rule('Frame must have title attr', 'Please add title attribute to this frame', function(dom){
  dom.$('frame').each(function(index, item){
    if (!dom.$(this).attr('title')){
      throw dom.$(item).parent().html();
    }
  });

  dom.$('iframe').each(function(index, item){
    if (!dom.$(this).attr('title')){
      throw dom.$(item).parent().html();
    }
  });
}); rules.push(rule);

// Guideline 3.1 - Rule 45
rule = new Rule('All pages should have lang attr in html tag', 'Please add the lang attribute to the html tag', function(dom){
  if (!dom.$('html').attr('lang')){
    throw dom.$('html').parent().html();
  }
}); rules.push(rule);

// Guideline 4.1 - Rule 17
rule = new Rule('Do not use font element', 'Please remove the font element', function(dom){
  dom.$('font').each(function(index, item){
    throw dom.$(item).parent().html();
  });
}); rules.push(rule);

// Guideline 4.1 - Rule 58
rule = new Rule('Do not use b element', 'Please remove the b element', function(dom){
  dom.$('b').each(function(index, item){
    throw dom.$(item).parent().html();
  });
}); rules.push(rule);

// Guideline 4.1 - Rule 59
rule = new Rule('Do not use i element', 'Please remove the i element', function(dom){
  dom.$('i').each(function(index, item){
    throw dom.$(item).parent().html();
  });
}); rules.push(rule);

// Guideline 4.1 - Rule 60
rule = new Rule('Do not use u element', 'Please remove the u element', function(dom){
  dom.$('u').each(function(index, item){
    throw dom.$(item).parent().html();
  });
}); rules.push(rule);

exports.Rules = rules;