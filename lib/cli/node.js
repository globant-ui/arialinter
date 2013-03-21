var ArialLinter = require('../arialinter.js').ArialLinter;
var async = require('async');
var program = require('commander');
var linter = new ArialLinter();
var colors = require('colors');

var executeLinter = function(files) {
  var x = 0;

  async.each(files, function(file, callback) {
    linter.initialize(file, function() {
      x++;

      if (linter.evaluate()){
        console.log(('The HTML of the file ' + file + ' seems to be valid according the WCAG 2.0 spec.\n').blue);
        callback();
      } else {
        console.log(('The HTML of the file ' + file + ' doenst seem to be valid according the WCAG 2.0 spec.\n').red);
        callback();
      }
    });
  });
};

program
  .version('0.0.1')
  .usage('[options] <files ...>')
  .option('-r, --rules', 'List all the rules')
  .parse(process.argv);

if (program.rawArgs.length >= 3 && program.args.length >= 0) {
  if (program.rules) {
    console.log('Displaying rules..');
    console.log('');
    linter.initRules();
    var rules = linter.getRules();
    var len = rules.length;

    for (var x = 0; x < len; x++) {
      console.log('Rule: ' + rules[x]);
    }
  } else {
    console.log('Applying linter..');
    executeLinter(program.args);
  }
} else {
  program.help();
}


