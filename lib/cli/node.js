var ArialLinter = require('../arialinter.js').ArialLinter;
var async = require('async');
var program = require('commander');
var linter = new ArialLinter();
var colors = require('colors');

var executeLinter = function(files, options) {
  var x = 0;

  async.each(files, function(file, callback) {
    linter.initialize(file, function() {
      x++;

      if (linter.evaluate(options)){
        console.log(('The HTML of the file ' + file + ' seems to be valid according the WCAG 2.0 spec.\n').blue);
        callback();
      } else {
        console.log(('The HTML of the file ' + file + ' doenst seem to be valid according the WCAG 2.0 spec.\n').red);
        console.log(linter.getReport('text'));
        callback();
      }
    });
  });
};

program
  .version('0.0.1')
  .usage('[options] <files ...>')
  .option('-r, --rules', 'List all the rules')
  .option('-l, --level <level>', 'Select the level of success criteria')
  .option('-t, --templates', 'Only executes the rules that apply for templates')
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
      if ((program.templates) && (program.level)) {
        console.log('for templates and with level');
        executeLinter(program.args, {
          level: program.level,
          template: true
        });
      } else {
        if (program.templates) {
          console.log('only for templates');
          executeLinter(program.args, {
            template: true
          });
        }
        else {
          if (program.level) {
            console.log('only for level');
            executeLinter(program.args, {
              level: program.level
            });
          }
          else {
            console.log('Applying default linter..');
            executeLinter(program.args);
          }
        }
    }
  }
} else {
  program.help();
}


