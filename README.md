# stylis-plugin-stylelint

Run stylelint as a Stylis plugin. The plugin runs against the CSS content during
the `-1` stage.

## Usage

```js
import stylis from 'stylis'
import stylelintPlugin from 'stylis-plugin-stylelint'

stylis.use(stylelintPlugin(/* options */))
```

### Options

#### failOnError

Whether to throw an error from the plugin if stylelint finds any errors.

Default: `false`

#### stripIndent

Whether to strip indentation from the CSS string before linting. Uses the
[strip-indent](https://github.com/sindresorhus/strip-indent) module.

Default: `true`

#### formatter

The stylelint formatter to use.

Default: `'string'`

#### getLintOptions

A custom function to add options to
[the object passed to stylelint](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/node-api.md#options).
The result will be merged with (and will overwrite) existing options set by this
plugin.

The function is called with a `meta` object with values from stylis:

`{ selectors, parent, line, column, length }`

Default: `undefined`

### resultCollector

If `failOnError` is false but there is an error, this function will be called
with the results. You can use this to extract the errors that occurred and
report them in a nicer way without throwing.

Default: `undefined`
