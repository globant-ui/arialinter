var rule = require('./rule');

var ALinterClass = function() { };

ALinterClass.prototype = {
    initialize: function(window) {
        this.dom = window;
        this.Rules = [];

        // Simple rule just for testing purposes
        var ruleImages = new rule.RuleClass('All img must have alt', 'Please add the alt attribute to this image', function(dom){
          dom.$('img').each(function(index, item){

            console.log('Image:' + item);

            if (!dom.$(this).attr('alt')){
              throw 'exception';
            }
          });
        });

        this.Rules.push(ruleImages);
    },

    evaluate: function(){
      for (var x = 0; x < this.Rules.length; x++){
        console.log('');
        console.log('--------> Starting with rule: ' + this.Rules[x].getName())
        console.log(this.Rules[x].applyRule(this.dom));
      };
    }
};

exports.ALinterClass = ALinterClass;