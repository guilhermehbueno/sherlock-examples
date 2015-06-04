investigation("Simple investigation", function(sherlock){
	investigate("1 - Teste", function(context, done){
		var questions = [
			{name:'test', type:'input', message:'Deu certo?', default:'Sim!', apply: function(answers){ return !answers.test}}
		];

		ask(questions, function(answers){
			conclusion(answers, function(){
				done();
			});
		});
	});

	conclude(function(conclusions){
		console.log(JSON.stringify(conclusions, null, '\t'));
	});
});