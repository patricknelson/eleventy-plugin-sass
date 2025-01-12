# eleventy-plugin-sass

A plugin that adds [Sass](https://sass-lang.com/) support to [Eleventy](https://github.com/11ty/eleventy)

## Installation

Available on [npm](https://www.npmjs.com/package/eleventy-plugin-sass).

```
npm install eleventy-plugin-sass --save
```

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

```
const pluginSass = require("eleventy-plugin-sass");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSass, sassPluginOptions);
};
```

Read more about [Eleventy plugins.](https://www.11ty.io/docs/plugins/)

## Options

| Key               | Type                   | Default                                    | description                                                                                                                                                                                                                                                                                                                     |
|-------------------|------------------------|--------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `watch`           | glob or array of globs | `['**/*.{scss,sass}', '!node_modules/**']` | The sass files you wish to compile (and watch when you serve)                                                                                                                                                                                                                                                                   |
| `sourcemaps`      | Boolean                | `false`                                    | Add sourcemaps next to your sass files                                                                                                                                                                                                                                                                                          |
| `cleanCSS`        | Boolean                | `true`                                     | Runs the css trough [cleanCSS](https://github.com/jakubpawlowicz/clean-css)                                                                                                                                                                                                                                                     |
| `cleanCSSOptions` | Object                 | `N/A`                                      | Options to pass to cleanCSS                                                                                                                                                                                                                                                                                                     |
| `autoprefixer`    | Boolean                | `true`                                     | Adds browser specific prefixes if needed (adheres to [BrowserList](https://github.com/browserslist/browserslist))                                                                                                                                                                                                               |
| `outputDir`       | String                 | undefined                                  | specifies the desired output directory                                                                                                                                                                                                                                                                                          |
| `remap`           | Boolean                | false                                      | toggles the way EPS handles the output or better omits the path-part of each parsed file, so that you might get a slightly cleaner output                                                                                                                                                                                       |
| `compiler`        | Object                 | `require('sass')`                          | Allows you to override the default compiler used (currently [node-sass](https://github.com/sass/node-sass#options)). <br/><br/> For example: Add `node-sass` to your `package.json` and then specify `require('node-sass')` to use the now dreprecated [node-sass](https://github.com/sass/node-sass#options) compiler instead. |
| `sassOptions`     | Object                 | `N/A`                                      | Options you want to pass to the specified sass compiler (see above).                                                                                                                                                                                                                                                            |

## Disclaimer

This plugins wraps around internal Eleventy code, so if they changes their way of working it might stop working.

## Contributing

Please do contribute, I am open to any changes. Just clone the repository and open a pull request.

## License

MIT © [Maarten Schroeven](maarten@sonaryr.be)
