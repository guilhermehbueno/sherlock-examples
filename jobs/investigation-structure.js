//Example of a Investigation job structure
//====================

//### <b>investigation</b>
//The <b>investigation</b> function is the main function in a sherlock job. It's responsible for aggregate the investigate actions.

//<b>investigation(name, callback)</b>

// <b>Name</b> 	 | <b>Type</b>	 |<b> Description</b>
// ------------- | ------------- | -------------
// name  	 	 | string  	 	 | The name of investigation
// callback(<b>sherlock</b>)  	 | function  	 | A callback that receives the sherlock helper object
// [See sherlock object description!](jobWithTailCommand.html)
//<hr>
investigation("Investigation Structure", function(sherlock){
	//### <b>investigate</b>
	// The <b>investigate</b> function is responsible for group the logic from job
	//<b>investigate(name, callback)</b>

	// <b>Name</b> 	 | <b>Type</b>	 |<b> Description</b>
	// ------------- | ------------- | -------------
	// name  	 	 | string  	 	 | The name of investigation
	// callback(<b>context</b>,<b>done</b>)  	 | function  	 | A callback that receives the sherlock helper object
	//<hr>
	investigate("Investigate Server", function(context, done){
		//### <b>ask</b>
		// The <b>ask</b> function is responsible for prompt the questions to user
		//<b>ask(questions, callback)</b>

		// <b>Name</b> 	 | <b>Type</b>	 |<b> Description</b>
		// ------------- | ------------- | -------------
		// questions  	 	 | array  	 	 | A array of questions
		// callback(<b>answers</b>)  	 | function  	 | A callback that receives the answers from user
		//<hr>
		ask([], function(answers){
			//### <b>check</b>
			// The <b>check</b> function is responsible for access execute configurated commands in respectives servers
			//
			//<b>check(questions, callback)</b>

			// <b>Name</b> 	 | <b>Type</b>	 |<b> Description</b>
			// ------------- | ------------- | -------------
			// answers  	 	 | object  	 	 | A array of questions
			// callback(<b>response</b>)  	 | function  	 | A callback that receives the answers from user
			//<hr>
			check(answers, function(response){
				//### <b>conclusion</b>
				// The <b>conclusion</b> function is responsible for register the conclusion of this investigate action
				//
				//<b>conclusion(conslusion, callback)</b>

				// <b>Name</b> 	 | <b>Type</b>	 |<b> Description</b>
				// ------------- | ------------- | -------------
				// conclusion  	 | object  	 	 | A object that represents the conclusion 
				// callback()  	 | function  	 | A callback 
				//<hr>
				conclusion({}, function(){
					//### <b>done</b>
					// The <b>done</b> function inform that function is done
					//
					//<b>done()</b>
					//<hr>
					done();
				});
			});
		})
	});

	//### <b>conclude</b>
	// The <b>conclude</b> function is responsible for consolidate all conclusions from other investigate actions
	//
	//<b>conclude(callback)</b>8
	//
	// <b>Name</b> 	 | <b>Type</b>	 |<b> Description</b>
	// ------------- | ------------- | -------------
	// callback(<b>conclusions</b>)  	 | function  	 | A callback that receives the conclusions from the <b>investigate</b> functions
	//<hr>
	conclude(function(conclusions){
		console.log(JSON.stringify(conclusions, null, '\t'));
	});
});