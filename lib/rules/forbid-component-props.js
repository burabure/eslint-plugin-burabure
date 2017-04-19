/**
 * @fileoverview Forbid certain props on components
 * @author Joe Lencioni
 * @author Nicolas Fernandez <@burabure>
 */

'use strict'

const sanitizeUserPattern = require('../util/sanitizeUserPattern')

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = ['className', 'style']

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Forbid certain props on components',
      category: 'Best Practices',
      recommended: false,
    },

    schema: [{
      type: 'object',
      properties: {
        ignoreDomNodes: {
          type: 'boolean',
        },
        forbid: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        forbidPatterns: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      additionalProperties: true,
    }],
  },

  create(context) {
    const configuration = context.options[0] || {}
    const ignoreDomNodes = configuration.ignoreDomNodes !== false

    function somePatternMatches(patterns, subject) {
      return patterns.reduce((acc, pattern) => {
        if (sanitizeUserPattern(pattern).test(subject)) {
          return true
        }
        return acc
      }, false)
    }

    function isForbidden(prop) {
      const forbid = configuration.forbid || DEFAULTS
      const forbidPatterns = configuration.forbidPatterns
      if (forbid.indexOf(prop) >= 0) {
        return true
      }

      if (forbidPatterns) {
        if (somePatternMatches(forbidPatterns, prop)) {
          return true
        }
      }

      return false
    }

    return {
      JSXAttribute(node) {
        const tag = node.parent.name.name
        if (ignoreDomNodes && tag && tag[0] !== tag[0].toUpperCase()) {
          // This is a DOM node, not a Component, so exit.
          return
        }

        const prop = node.name.name

        if (!isForbidden(prop)) {
          return
        }

        context.report({
          node,
          message: `Prop \`${prop}\` is forbidden on Components`,
        })
      },
    }
  },
}
