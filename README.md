# keybase-generator [![Build Status](https://img.shields.io/travis/jjperezaguinaga/keybase-generator/master.svg?style=flat-square)](https://travis-ci.org/jjperezaguinaga/keybase-generator)
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


🔑  Using kbpgp to generate private keys

## Install

```bash
$ npm install keybase-generator --save
```

## Usage

```js
const generator = require('keybase-generator')

try {

  const password = 'password'
  const userId = 'Jose Aguinaga <me@jjperezaguinaga.com>'

  generator(userid, password).then((keypair) => {
    console.log('Private Key', keypair.privateKey)
    console.log('Public Key', keypair.publicKey)
  })
  
} catch(err) {
  console.log('There was an error generating the keys', err)
}
```

## Related

[E.nigma](https://github.com/jjperezaguinaga/e.nigma.pw) - 🔐 e.nigma.pw / generatorion toolbox utility

## License

MIT © [Jose Aguinaga](https://jjperezaguinaga.com)
