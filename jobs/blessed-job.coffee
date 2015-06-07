investigation 'Testing blessed contrib', (sherlock) ->
  investigate 'Render dashboard', (context, done) ->
    console.log 'Render'
    done()
  conclude (conclusions) ->
    # sherlock.visualizations.dashboard()
    console.log 'Finish'