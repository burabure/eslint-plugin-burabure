ESLint-plugin-Burabure
===================

A collection of personal rules for ESLint that I need but are either too specific for other packages
or I'm not able to get the fork merged.

# Installation

No npm package for now, just add repo to package.json:
```
"eslint-plugin-burabure": "git+https://github.com/burabure/eslint-plugin-burabure.git"
```

# Configuration

Add `plugins` section and specify ESLint-plugin-Burabure as a plugin.

```json
{
  "plugins": [
    "burabure"
  ]
}
```

enable the rules that you would like to use.

# List of supported rules

### react related rules
* [burabure/forbid-component-props](docs/rules/forbid-component-props.md): Forbid certain props on Components w/regex support


# License

ESLint-plugin-Burabure is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
