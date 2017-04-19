/**
 * Takes an unsafe user pattern String and returns a safe RegExp
 */

'use strict'

const escapeRegExp = require('./escapeRegExp')

module.exports = function (str) {
  const safeString = escapeRegExp(str).replace('\\*', '.*')
  return RegExp(`^${safeString}$`)
}
