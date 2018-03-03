const execa = require('execa')

const nodeBin = process.execPath || 'node'
const stylelintSync = require.resolve('./stylelintSync')

function createStylelintPlugin({ failOnError = false } = {}) {
  function stylelintPlugin(
    context,
    content,
    selectors,
    parent,
    line,
    column,
    length
  ) {
    if (context === -1) {
      const child = execa.sync(nodeBin, [stylelintSync], { input: content })
      const response = JSON.parse(child.stdout)
      if (response.error) {
        const error = new Error(response.error.message)
        error.code = response.error.code
        throw error
      }
      if (response.result.output) {
        console.error(response.result.output)
        if (failOnError && response.result.errored) {
          throw new Error(
            'stylelint resulted in error(s) and stylis-plugin-stylelint has `failOnError` enabled.'
          )
        }
      }
    }
  }
  return stylelintPlugin
}

module.exports = createStylelintPlugin
