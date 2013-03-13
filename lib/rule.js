var RuleClass = function(name, message, callback){
  this.name     = name;
  this.callback = callback;
  this.message  = message;
};

RuleClass.prototype.applyRule = function(dom){
  try{
    this.callback(dom);

    return 'Success executing ' + this.name;
  }
  catch(e){
    return 'Error: ' + this.message;
  }

  return undefined;
};

RuleClass.prototype.getName = function(){
  return this.name;
};

RuleClass.prototype.getMessage = function(){
  return this.message;
};

exports.RuleClass = RuleClass;