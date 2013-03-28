var ArialLinter = require('arialinter');
var linter = new ArialLinter();

exports.index = function(req, res) {
  res.render('index', { message: req.flash('info') });
};

exports.lint = function(req, res) {
  linter.initialize(req.body.htmlContent, function() {
    if (linter.evaluate()) {
      console.log('success');
      req.flash('info', 'Linter executed successfully');
    } else {
      console.log('failed');
      req.flash('info', 'Linter failed');
    }

    res.redirect('/');
  });
};

