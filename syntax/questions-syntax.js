//Example of how to build questions in Sherlock jobs
//====================
investigation("Example of how to build questions in Sherlock jobs", function(sherlock){
	investigate("Investigate", function(context, done){
		var questions = [];

		//Sherlock uses inquirer.js to prompt questions.
		//Check Inquirer.js documentation to see all options that are supported in a question definition
		//[Inquirer.JS](https://github.com/SBoudrias/Inquirer.js)

		//Adding a question using simple JSON
		questions.push({
			type: "input",
			name: "name",
			message: "What is your name?",
			default: 'John Doe'
		});

		//Adding a dynamic question considering previous answers
		questions.push(function(answers){
			return {
				type: "input",
				name: "age",
				message: "Hello "+answers.name+", how old are you?",
				default: 18
			}
		});

		//Adding a function to verify if the question should be applied
		questions.push(function(answers){
			return {
				type: "confirm",
				name: "confirm",
				message: "Hello "+answers.name+", you should are older than 18, ok?",
				apply: function (answers) {
					return answers.age < 18;
				}	
			}
		});

		//Prompting questions to user through Inquirer.js engine
		ask(questions, function(answers){
			console.log(JSON.stringify(answers, null, '\t'));
			done();
		});
	});

	//The investigation execution depends of 
	conclude(function(conclusions){

	});
});
