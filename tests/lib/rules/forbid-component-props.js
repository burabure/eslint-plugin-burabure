/**
 * @fileoverview Tests for forbid-component-props
 */

'use strict'

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const rule = require('../../../lib/rules/forbid-component-props')
const RuleTester = require('eslint').RuleTester

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true,
  },
}

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const CLASSNAME_ERROR_MESSAGE = 'Prop `className` is forbidden on Components'
const STYLE_ERROR_MESSAGE = 'Prop `style` is forbidden on Components'

const ruleTester = new RuleTester()
ruleTester.run('forbid-component-props', rule, {

  valid: [{
    code: [
      'const First = React.createClass({',
      '  render: function() {',
      '    return <div className="foo" />',
      '  }',
      '})',
    ].join('\n'),
    parserOptions,
  }, {
    code: [
      'const First = React.createClass({',
      '  render: function() {',
      '    return <div style={{color: "red"}} />',
      '  }',
      '})',
    ].join('\n'),
    options: [{ forbid: ['style'] }],
    parserOptions,
  }, {
    code: [
      'const First = React.createClass({',
      '  propTypes: externalPropTypes,',
      '  render: function() {',
      '    return <Foo bar="baz" />',
      '  }',
      '})',
    ].join('\n'),
    parserOptions,
  }, {
    code: [
      'const First = React.createClass({',
      '  propTypes: externalPropTypes,',
      '  render: function() {',
      '    return <Foo className="bar" />',
      '  }',
      '})',
    ].join('\n'),
    options: [{ forbid: ['style'] }],
    parserOptions,
  }, {
    code: [
      'const First = React.createClass({',
      '  propTypes: externalPropTypes,',
      '  render: function() {',
      '    return <Foo className="bar" />',
      '  }',
      '})',
    ].join('\n'),
    options: [{ forbid: ['style', 'foo'] }],
    parserOptions,
  }, {
    code: [
      'const First = React.createClass({',
      '  propTypes: externalPropTypes,',
      '  render: function() {',
      '    return <this.Foo bar="baz" />',
      '  }',
      '})',
    ].join('\n'),
    parserOptions,
  }, {
    code: [
      'class First extends React.createClass {',
      '  render() {',
      '    return <this.foo className="bar" />',
      '  }',
      '}',
    ].join('\n'),
    options: [{ forbid: ['style'] }],
    parserOptions,
  }, {
    code: [
      'const First = (props) => (',
      '  <this.Foo {...props} />',
      ')',
    ].join('\n'),
    parserOptions,
  }, {
    code: [
      'const First = React.createClass({',
      '  propTypes: externalPropTypes,',
      '  render: function() {',
      '    return <Foo bar="baz"/>',
      '  }',
      '})',
    ].join('\n'),
    options: [{ forbidPatterns: ['data-*', 'custom-*'] }],
    parserOptions,
  }],

  invalid: [{
    code: [
      'const First = React.createClass({',
      '  propTypes: externalPropTypes,',
      '  render: function() {',
      '    return <Foo className="bar" />',
      '  }',
      '})',
    ].join('\n'),
    parserOptions,
    errors: [{
      message: CLASSNAME_ERROR_MESSAGE,
      line: 4,
      column: 17,
      type: 'JSXAttribute',
    }],
  }, {
    code: [
      'const First = React.createClass({',
      '  propTypes: externalPropTypes,',
      '  render: function() {',
      '    return <Foo style={{color: "red"}} />',
      '  }',
      '})',
    ].join('\n'),
    parserOptions,
    errors: [{
      message: STYLE_ERROR_MESSAGE,
      line: 4,
      column: 17,
      type: 'JSXAttribute',
    }],
  }, {
    code: [
      'const First = React.createClass({',
      '  propTypes: externalPropTypes,',
      '  render: function() {',
      '    return <Foo className="bar" />',
      '  }',
      '})',
    ].join('\n'),
    parserOptions,
    options: [{ forbid: ['className', 'style'] }],
    errors: [{
      message: CLASSNAME_ERROR_MESSAGE,
      line: 4,
      column: 17,
      type: 'JSXAttribute',
    }],
  }, {
    code: [
      'const First = React.createClass({',
      '  propTypes: externalPropTypes,',
      '  render: function() {',
      '    return <Foo style={{color: "red"}} />',
      '  }',
      '})',
    ].join('\n'),
    parserOptions,
    options: [{ forbid: ['className', 'style'] }],
    errors: [{
      message: STYLE_ERROR_MESSAGE,
      line: 4,
      column: 17,
      type: 'JSXAttribute',
    }],
  }, {
    code: [
      'const First = React.createClass({',
      '  propTypes: externalPropTypes,',
      '  render: function() {',
      '    return <Foo data-indicators />',
      '  }',
      '})',
    ].join('\n'),
    parserOptions,
    options: [{ forbidPatterns: ['data-*', 'custom-*'] }],
    errors: [{
      message: 'Prop `data-indicators` is forbidden on Components',
      line: 4,
      column: 17,
      type: 'JSXAttribute',
    }],
  }, {
    code: [
      'const First = React.createClass({',
      '  propTypes: externalPropTypes,',
      '  render: function() {',
      '    return <Foo style={{color: "red"}} data-indicators />',
      '  }',
      '})',
    ].join('\n'),
    parserOptions,
    options: [{ forbid: ['className', 'style'], forbidPatterns: ['data-*', 'custom-*'] }],
    errors: [{
      message: STYLE_ERROR_MESSAGE,
      line: 4,
      column: 17,
      type: 'JSXAttribute',
    }, {
      message: 'Prop `data-indicators` is forbidden on Components',
      line: 4,
      column: 40,
      type: 'JSXAttribute',
    }],
  }, {
    code: [
      'const First = React.createClass({',
      '  propTypes: externalPropTypes,',
      '  render: function() {',
      '    return <div style={{color: "red"}} data-indicators />',
      '  }',
      '})',
    ].join('\n'),
    parserOptions,
    options: [{
      forbid: ['className', 'style'],
      forbidPatterns: ['data-*', 'custom-*'],
      ignoreDomNodes: false,
    }],
    errors: [{
      message: STYLE_ERROR_MESSAGE,
      line: 4,
      column: 17,
      type: 'JSXAttribute',
    }, {
      message: 'Prop `data-indicators` is forbidden on Components',
      line: 4,
      column: 40,
      type: 'JSXAttribute',
    }],
  }],
})
