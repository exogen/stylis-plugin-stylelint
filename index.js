const execa = require('execa')
const stripIndentFn = require('strip-indent')

const nodeBin = process.execPath || 'node'
const stylelintSync = require.resolve('./stylelintSync')

function createStylelintPlugin({
  failOnError = false,
  stripIndent = true,
  formatter = 'string',
  getLintOptions
} = {}) {
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
      const meta = { selectors, parent, line, column, length }
      const options = {
        formatter,
        code: stripIndent ? stripIndentFn(content) : content
      }
      if (getLintOptions) {
        Object.assign(options, getLintOptions(meta))
      }
      const child = execa.sync(nodeBin, [stylelintSync], {
        input: JSON.stringify(options)
      })
      const response = JSON.parse(child.stdout)
      if (response.error) {
        const error = new Error(response.error.message)
        error.code = response.error.code
        error.meta = meta
        error.options = options
        throw error
      }
      if (response.result.output) {
        console.error(response.result.output)
      }
      if (failOnError && response.result.errored) {
        const error = new Error(
          'stylelint resulted in error(s) and stylis-plugin-stylelint has `failOnError` enabled.'
        )
        error.meta = meta
        error.options = options
        throw error
      }
    }
  }
  return stylelintPlugin
}

module.exports = createStylelintPlugin
