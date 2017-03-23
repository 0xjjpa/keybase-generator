/* global it */
/* global beforeEach */
/* global jasmine */

const generator = require('../src')

beforeEach(function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000
})

it('returns a KeyManager generator', async () => {
  const privateKey = await generator('Test <me@test.com>', 'password')
  console.log('Private Key', privateKey)
})
