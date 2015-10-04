investigation 'Using local questions with sherlock context', (sherlock) ->
  investigate '1 - Test', (context, done) ->
    questions = []
    questions.push message:'Say something', type:'input', name:'something', default:'Hi'

    ask questions, (answers) ->
      context = new sherlock.executions.Context
      context.ssh commands:[
        {name: 'Create', command: "echo \"#{answers.something}\" >> hello.txt | echo 'Success, file \"#{answers.something}\" was created'"}
      ]

      context.scp({
        path:'/root/hello.txt',
        target:'temp/'
      })

      ssh  = new sherlock.executions.SSH ['127.0.0.1'], 2222
      scp  = new sherlock.executions.SCP ['127.0.0.1'], 2222
      flow = new sherlock.executions.Flow null, context
      flow.add ssh
      flow.add scp

      check flow, (response) ->
          conclusion response, ->
            done()

  conclude (conclusions) ->
    console.log conclusion for conclusion in conclusions