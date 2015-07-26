investigation 'Dynamic questions investigation', (sherlock) ->
  investigate 'Commands with dynamic questions', (context, done) ->
    questions = []
    questions.push message:'Say something', type:'input', name:'message', default:'Hi'
    ask questions, (answers) ->
      context = new sherlock.executions.Context
      commands = new sherlock.executions.Commands
      context.ssh commands:[
        {name: 'Create file', command: "echo \"#{answers.message}\" > createdBySherlockJob.txt | echo 'Success, file \"#{answers.message}\" was created'"},
        {name: 'List files', command: "ls -lart"}
      ]

      context.scp({
        path:'/home/gbueno1/createdBySherlockJob.txt',
        target: 'temp/'
      });

      commands.addCommand 'Print file', 'cat temp/createdBySherlockJob.txt'
      context.local commands

      ssh   = new sherlock.executions.SSH ['127.0.0.1'], 22
      scp   = new sherlock.executions.SCP '127.0.0.1', 22
      local = new sherlock.executions.Local
      flow  = new sherlock.executions.Flow null, context

      flow.add ssh
      flow.add scp
      flow.add local

      check flow, (response) ->
        conclusion response, ->
          done()
  conclude (conclusions) ->
    console.log JSON.stringify result, null, '\t' for result in conclusions