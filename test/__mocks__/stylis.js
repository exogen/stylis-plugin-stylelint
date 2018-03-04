const stylis = require('stylis')
const createPlugin = require('../../index')

function mockStylis(...args) {
  if (this && this.constructor === mockStylis) {
    const plugin = createPlugin({ failOnError: false })
    instance = new stylis(...args)
    instance.use(plugin)
    return instance
  }
  return stylis.apply(this, args)
}

module.exports = mockStylis
