investigation "Queries per second investigation", (sherlock) ->
  investigate "QPS", (context, done) ->
    questions = []
    questions.push type:'input', name: 'size', message:'Results size', default: 5
    questions.push type:'input', name: 'startDate', message:'Start date'
    ask questions, (answers) ->
      done()
  conclude (conclusions) ->
    console.log "Finish"