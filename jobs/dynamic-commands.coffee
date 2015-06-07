investigation "Job with dynamic commands", (sherlock) ->
  investigate "Load commands from sherlock.json", (context, done) ->
    questions = [sherlock.questions.selectDynamicCommands()]
    ask questions, (answers) ->
      answers.report =
        name: 'SAAS'
        commands: answers.commands
      check answers, (response) ->
        concl =
          response: response
          visualization: sherlock.visualizations.confluenceMultiCommandVisualization
        conclusion concl, ->
          done()
  conclude (conclusions) ->
    fs = require('fs')
    confluence = result.conclusion.visualization(result) for result in conclusions
    resultName = "#{process.cwd()}/results/investigation_result.html"
    fs.writeFile resultName, confluence, (err) ->
      throw err if err
      console.log "   created result in : #{resultName}"