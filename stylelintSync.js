const stylelint = require('stylelint')
const getStdin = require('get-stdin')

getStdin().then(input => {
  input = JSON.parse(input)
  stylelint
    .lint(input)
    .then(result => {
      console.log(JSON.stringify({ result }))
    })
    .catch(err => {
      console.log(
        JSON.stringify({
          error: {
            message: err.toString(),
            code: err.code
          }
        })
      )
    })
})
