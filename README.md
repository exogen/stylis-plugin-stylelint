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
