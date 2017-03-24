/* global it */
/* global beforeEach */
/* global jasmine */
import encrypt from 'keybase-encrypt'

const generator = require('../src')

beforeEach(function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000
})

it('creates a new private key that can be used to encrypt a message', async () => {
  const password = 'password'
  const message = 'message'
  const {privateKey, publicKey} = await generator('Test <me@test.com>', password)

  const encryptedMessage = await encrypt(publicKey, message)
    .then(encryptedMessage => encryptedMessage)

  console.log('Private Key', privateKey)
  console.log('Public Key', publicKey)
  console.log('Encrypted message', encryptedMessage)
})
