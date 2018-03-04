jest.unmock('stylis')
const stylis = require('stylis')
const createPlugin = require('../index')

describe('plugin', () => {
  describe('with styled-components configuration', () => {
    const instance = new stylis({
      global: false,
      cascade: true,
      keyframe: false,
      prefix: true,
      compress: false,
      semicolon: false
    })
    const plugin = createPlugin({ failOnError: true })
    instance.use(plugin)

    it('throws an error when failOnError is true and lint fails', () => {
      expect(() => instance('', `border: blah`)).toThrow(
        'stylelint resulted in error(s) and stylis-plugin-stylelint has `failOnError` enabled.'
      )
    })

    it('works on nested selectors', () => {
      expect(() =>
        instance(
          '',
          `
.foo {
  .bar {
    color: red;
  }
}
      `.trim()
        )
      ).not.toThrow()
    })
  })
})
