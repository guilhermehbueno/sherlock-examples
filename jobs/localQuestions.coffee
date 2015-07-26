investigation 'Using local questions with sherlock context', (sherlock) ->
  investigate '1 - Test', (context, done) ->
    console.log sherlock.questionsLoader.simpleQuestion()
    questions = [sherlock.questionsLoader.simpleQuestion()]

    ask questions, (answers) ->
      conclusion answers, ->
        done()
  conclude (conclusions) ->
    console.log conclusion for conclusion in conclusions