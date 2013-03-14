'use strict';

var arialinter = require('../lib/arialinter.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['Rules For Images'] = {

  setUp: function(done) {
    done();
  },

  'HaveAltAttr': function(test) {
    var linter = new arialinter.ALinterClass();
    var uri = '<!doctype html><html><head></head><body><img src="http://dummyimage.com/600x400.gif/292929/e3e3e3" alt="dd" /><img src="http://dummyimage.com/600x400.gif/292929/e3e3e3" alt="asd" /></body> </html>';


    linter.initialize(uri, function(){

      //Add a default rule
      linter.addRule('All img must have alt', 'Please add the alt attribute to this image', function(dom){
        dom.$('img').each(function(index, item){

          console.log('Image:' + item);

          if (!dom.$(this).attr('alt')){
            throw 'exception';
          }
        });
      });

      test.ok(linter.evaluate(), 'All the images should have the alt attr');
      test.done();
    });
  },

  'DoesntHaveAltAttr': function(test) {
    var linter = new arialinter.ALinterClass();
    var uri = '<!doctype html><html><head></head><body><img src="http://dummyimage.com/600x400.gif/292929/e3e3e3" /><img src="http://dummyimage.com/600x400.gif/292929/e3e3e3" /></body> </html>';


    linter.initialize(uri, function(){

      //Add a default rule
      linter.addRule('All img must have alt', 'Please add the alt attribute to this image', function(dom){
        dom.$('img').each(function(index, item){

          console.log('Image:' + item);

          if (!dom.$(this).attr('alt')){
            throw 'exception';
          }
        });
      });

      test.equal(linter.evaluate(), false, 'Should fail because images doesnt have alt');
      test.done();
    });
  },

};






