var winston = require('winston');

module.exports = function(properties){
  if(!properties){
    properties={};
  }

  var questionDefinition={};
  questionDefinition.message = properties.message || 'Is this a simple question?';
  questionDefinition.name    = properties.name  || 'simple';
  questionDefinition.type    = properties.type  || 'input';
  questionDefinition.default = properties.default || 'yes';

  return function(answers){
    return {
      message: questionDefinition.message,
      name: questionDefinition.name,
      type:questionDefinition.type,
      default: questionDefinition.default,
      apply: function(answers){
        var should = !answers[questionDefinition.name];
        winston.debug('Should ask question? ', !answers[questionDefinition.name]);
        if(!should){
          winston.info(questionDefinition.message + " = " + answers[questionDefinition.name]);
        }
        return should;
      }
    };
  }
}