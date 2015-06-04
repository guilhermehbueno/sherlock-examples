var d3 = require('d3');

investigation("Job With Tail Command", function(sherlock){

	//Function responsible for investigate
	investigate("QPS per second", function(context, done){
		defaulProperties = {
			env: 'prod',
			component: 'solr',
			servers: ['prod-solr-2', 'prod-solr-3', 'prod-solr-4', 'prod-solr-5']
		}
		ask([], function(answers){
			answers.report={
				name:'QPS per second',
				commands: [
					{
						name: 'qps',
						command:
						"tail -f /walmart/log/solr/solr.log | awk \'BEGIN { count = 0; date = \"\"; } { if(substr($4, 1, 8) != date) { print date, \"-\", count; system(\"\"); count = 1; date = substr($4, 1, 8); } else { count++; } }\'"
					}]
			}

			answers.stream=true;
			var responses = d3.map();

			setInterval(function(){
				sherlock.visualizations.qpsLineCommandDashboard(responses);
			}, 1000);


			check(answers, function(response){
				var values = response.rawData.replace(/\n/g,'').split(" - ");
				var resp = {
					time:values[0],
					requests:values[1].trim()
				}

				if(!isNaN(resp.requests)){
					responses.set(response.server, resp);
				}
			});
		}, defaulProperties);
	});

	conclude(function(conclusions){
		conclusions.forEach(function(conclusion){
			console.log(conclusion);
		});
	});
});