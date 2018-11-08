const zlib = require('zlib')
const unpack = require('php-pack').unpack

/**
 * decode 纯真ip库
 * @param {Buffer} copywrite http://update.cz88.net/ip/copywrite.rar
 * @param {Buffer} qqwryData http://update.cz88.net/ip/qqwry.rar
 * @returns {Buffer}
 */
module.exports = function (copywrite, qqwryData) {
  let qqwry = Array.from(qqwryData)
  let key = unpack('V6', copywrite)[6]
  for (let i = 0; i < 0x200; i++) {
    key *= 0x805
    key++
    key = key & 0xFF
    qqwry[i] = String.fromCharCode((String.prototype.charCodeAt.call(qqwry[i])) ^ key)
  }
  qqwry = qqwry.join('')
  qqwry = Buffer.from(qqwry, 'binary')
  qqwry = zlib.inflateSync(qqwry)
  return qqwry
}
