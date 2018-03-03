const stylelint = require('stylelint')
const getStdin = require('get-stdin')

getStdin().then(css => {
  stylelint
    .lint({ code: css, formatter: 'string' })
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
