import P from 'bluebird'
import kbpgp from 'kbpgp'

const F = kbpgp['const'].openpgp

const keyManagerGenerate = P.promisify(kbpgp.KeyManager.generate)

module.exports = async function generate (userid, passphrase) {
  try {
    const asp = new kbpgp.ASP({
      progress_hook: (o) => {
        console.log('Progress: ', o)
      }
    })
    const opts = (userid) => ({
      asp: asp,
      userid: userid,
      primary: {
        nbits: 4096,
        flags: F.certify_keys | F.sign_data | F.auth | F.encrypt_comm | F.encrypt_storage,
        expire_in: 0
      },
      subkeys: [
        {
          nbits: 2048,
          flags: F.sign_data,
          expire: 86400 * 365 * 8
        },
        {
          nbits: 2048,
          flags: F.encrypt_comm | F.encrypt_storage,
          expire: 86400 * 365 * 2
        }
      ]
    })

    const keyManager = await keyManagerGenerate(opts(userid))
        .then((keyManager) => keyManager)

    return new Promise(function (resolve, reject) {
      keyManager.sign({}, (err) => {
        if (err) {
          reject(err)
        } else {
          keyManager.export_pgp_private({
            passphrase: passphrase
          }, (err, privateKey) => {
            if (err) {
              reject(err)
            } else {
              keyManager.export_pgp_public({}, (err, publicKey) => {
                if (err) {
                  reject(err)
                } else {
                  resolve({privateKey: privateKey, publicKey: publicKey})
                }
              })
            }
          })
        }
      })
    })
  } catch (err) {
    return Promise.reject(err)
  }
}
