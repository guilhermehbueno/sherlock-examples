investigation 'Simple investigation', (sherlock) ->
  investigate '1 - Test', (context, done) ->
    questions = [
      {
        name:'param1'
        type:'input'
        message:'Deu certo?'
        default:'Sim'
        apply: (answers) -> !answers.param1
      }
    ]

    ask questions, (answers) ->
      conclusion answers, ->
        done()
  conclude (conclusions) ->
    console.log conclusion for conclusion in conclusions