/*
 * arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2013 Globait UI Developers
 * Licensed under the MIT license.
 */

'use strict';


var jsdom  = require('jsdom');
var linter = require('./linter');

var parsePage = function(callback){

  jsdom.env(
    '<!doctype html><html><head></head><body><img src="http://dummyimage.com/600x400.gif/292929/e3e3e3" alt="dd" /><img src="http://dummyimage.com/600x400.gif/292929/e3e3e3" alt="asd" /></body> </html>',
    ['http://code.jquery.com/jquery.js'],
    function (err, window){
      if (!err){
        var l = new linter.ALinterClass();
        l.initialize(window);
        l.evaluate();

        callback();
      }
      else{
        console.log('error on jsdom: ' + err);
      }
    }
  );

};

exports.parsePage = parsePage;