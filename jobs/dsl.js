var cli = require('cli-color');
var date = new Date();
var timeFormated = date.toTimeString().split(" ")[0].substring(0, 5);
var dateArray = date.toDateString().split(" ");
var dateFormated = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[3];

investigation('#Hi Sherlock', function(sherlock){
	investigate('1 - #Sherlock SAAS QPS investigation', function(context, done){
		var questions=[];
		questions.push({message: "Inform the Environment", name: "env", type:"list", choices:sherlock.environment.getEnvironmentList(), default: "prod" });
		questions.push(function(answers){
			return {message: "Inform the Components", name: "component", type:"list", choices:sherlock.environment.getComponentList(answers.env), default: "saas" }
		});

		questions.push(function(answers){
			return { message: "Select Servers", name: "servers", type:"checkbox", choices: sherlock.environment.getComponent(answers.env, answers.component).servers, default: sherlock.environment.getComponent(answers.env, answers.component).servers }
		});

		questions.push({ message:'Results size', name:'size', type:'input', default: 5});
		questions.push({ message:'Start date', name:'startDate', type:'input', default: dateFormated});
		questions.push({ message:'Start time', name:'startTime', type:'input', default: "00:00"});
		questions.push({ message:'End date', name:'endDate', type:'input', default: dateFormated});
		questions.push({ message:'End time', name:'endTime', type:'input', default: timeFormated});

		ask(questions, function(answers){
			answers.report = {
				name:'QPS',
				commands: [sherlock.commands.qps(answers)]
			};
			check(answers, function(response){
				conclusion(response, function(){
					done();
				});
			});
		});
	});

	skip.investigate('2 - #Sherlock Varnish QPS investigation', function(context, done){
		var questions=[];
		questions.push({message: "Inform the Environment", name: "env", type:"list", choices:sherlock.environment.getEnvironmentList(), default: "prod" });
		questions.push(function(answers){
			return {message: "Inform the Components", name: "component", type:"list", choices:sherlock.environment.getComponentList(answers.env), default: "saas" }
		});

		questions.push(function(answers){
			return { message: "Select Servers", name: "servers", type:"checkbox", choices: sherlock.environment.getComponent(answers.env, answers.component).servers, default: sherlock.environment.getComponent(answers.env, answers.component).servers }
		});

		questions.push({ message:'Results size', name:'size', type:'input', default: 5});
		questions.push({ message:'Start date', name:'startDate', type:'input', default: dateFormated});
		questions.push({ message:'Start time', name:'startTime', type:'input', default: "00:00"});
		questions.push({ message:'End date', name:'endDate', type:'input', default: dateFormated});
		questions.push({ message:'End time', name:'endTime', type:'input', default: timeFormated});

		ask(questions, function(answers){
			answers.report = {
				name:'QPS',
				commands: [sherlock.commands.qps(answers)]
			};
			check(answers, function(response){
				conclusion(response, function(){
					done();
				});
			});
		});
	});

	conclude(function(conclusions){
		conclusions.forEach(function(conclusion){
			console.log(cli.green("################################################"));
			console.log(cli.green('QPS - Queries por Segundo'));
			console.log(cli.green('Ambiente: ' + conclusion.context.env.toUpperCase()));
			console.log(cli.green('Componente: ' + conclusion.context.component.toUpperCase()));
			console.log(cli.green('TOP ' + conclusion.context.size + ' QPS'));
			console.log(cli.green('Data/Hora inicial:\t' +conclusion.context.startDate+'\t'+conclusion.context.startTime+':00'));
			console.log(cli.green('Data/Hora final:\t'+conclusion.context.endDate+'\t'+conclusion.context.endTime+':59'));
			console.log(cli.green("################################################"));

			Visualizations.SimpleTableVisualization(conclusion.conclusion);
		});
	});
});