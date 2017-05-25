'use strict'

module.exports = {
  rules: {
    'forbid-component-props': require('./lib/rules/forbid-component-props'),
    'no-direct-mutation-state': require('./lib/rules/no-direct-mutation-state'),
  },
}
