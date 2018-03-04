const React = require('react')
const styled = require('styled-components').default
const TestRenderer = require('react-test-renderer')

describe('using a stylis mock to lint styled-components', () => {
  it('passes lint', () => {
    const Title = styled.h1`
      color: red;
    `
    const wrapper = TestRenderer.create(<Title />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it('logs multiple lint errors', () => {
    // prettier-ignore
    const Title = styled.h1`
      background: d2
      color: {}
    `
    const wrapper = TestRenderer.create(<Title />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
