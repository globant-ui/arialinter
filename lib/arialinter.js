/*
 * arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2013 Globait UI Developers
 * Licensed under the MIT license.
 */

'use strict';


var jsdom = require('jsdom');

var parsePage = function(callback){

  jsdom.env(
    'http://www.imdb.com/name/nm0000365/',
    ['http://code.jquery.com/jquery.js'],
    function (err, window){
      if (!err){
        window.$('img').each(function(index, item){
          var has = window.$(this).attr('alt') ? 'does' : 'doesnt';

          console.log('Image ' + index + ' ' + has  + ' have ALT attribute.');
        });

        callback();
      }
    }
  );

};


exports.parsePage = parsePage;