investigation 'job with execution flow', (sherlock) ->
  investigate 'run simple commmand in VM', (context, done) ->
    questions = []
    questions.push name: 'filename', type:'input', message:'Filename'
    ask questions, (answers) ->
        context = new sherlock.executions.Context
        context.ssh commands:[
            {name: 'Create', command: "touch #{answers.filename} | echo 'Success, file \"#{answers.filename}\" was created'"},
            {name: 'Uname', command: "uname -a"}
            {name: 'pwd', command:'pwd'},
            {name: 'List', command:'ls'}
        ]

        ssh   = new sherlock.executions.SSH ['127.0.0.1'], 2222
        flow = new sherlock.executions.Flow null, context
        flow.add ssh

        check flow, (response) ->
          conclusion response, ->
            done()

  conclude (conclusions) ->
    results=[]
    results.push  conclusion: conclusion.conclusion[0] for conclusion in conclusions

    try
        sherlock.visualizations.multiCommandTableVisualization(results[0])
     catch error
        console.log(error)