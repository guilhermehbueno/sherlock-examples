investigation 'job with execution flow', (sherlock) ->
  investigate 'run simple commmand in VM', (context, done) ->
    questions = []
    questions.push name: 'filename', type:'input', message:'Filename'
    ask questions, (answers) ->
        context = new sherlock.executions.Context
        context.ssh commands:[
            {name: 'Create', command: "touch #{answers.filename} | echo 'Success, file \"#{answers.filename}\" was created'"}
        ]

        ssh   = new sherlock.executions.SSH ['127.0.0.1'], 2222
        flow = new sherlock.executions.Flow null, context
        flow.add ssh

        check flow, (response) ->
          conclusion response, ->
            done()

  conclude (conclusions) ->
    console.log conclusion.conclusion[0] for conclusion in conclusions

