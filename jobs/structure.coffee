investigation 'Name', (sherlock) ->
  investigate 'Uname', (context, done) ->
    ask [], (answers) ->
      check answers, (response) ->
        conclusion response, ->
          done()

  conclude (conclusions) ->
    console.log conclusion for conclusion in conclusions