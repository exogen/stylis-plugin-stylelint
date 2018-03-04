jest.unmock('stylis')
const Stylis = require('stylis')
const createPlugin = require('../index')

describe('plugin', () => {
  describe('with styled-components configuration', () => {
    const stylis = new Stylis({
      global: false,
      cascade: true,
      keyframe: false,
      prefix: true,
      compress: false,
      semicolon: false
    })
    const plugin = createPlugin({ failOnError: true })
    stylis.use(plugin)

    it('throws an error when failOnError is true and lint fails', () => {
      expect(() => stylis('', `border: blah`)).toThrow(
        'stylelint resulted in error(s) and stylis-plugin-stylelint has `failOnError` enabled.'
      )
    })

    it('works on nested selectors', () => {
      expect(() =>
        stylis(
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
