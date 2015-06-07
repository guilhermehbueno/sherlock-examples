investigation "Uname in vagrant VM", (sherlock) ->
  investigate "Uname", (context, done) ->
    ask [], (answers) ->
      answers.servers = ['127.0.0.1']
      answers.sshPort = 2222
      answers.report =
        name: 'Uname'
        commands: [
          {name:'Uname', command: 'uname -a'},
          {name:'Hello', command: 'echo "Hello Sherlock"'}
        ]
      console.log answers
      check answers, (response) ->
        conclusion response, ->
          done()
  conclude (conclusions) ->
      sherlock.visualizations.multiCommandTableVisualization(conclusion) for conclusion in conclusions