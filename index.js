const chokidar = require('chokidar');
const vfs = require('vinyl-fs');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const cleanCSS = require('gulp-clean-css');
const prefix = require('gulp-autoprefixer');
const chalk = require('chalk');
const _debounce = require('lodash.debounce');
const path = require('path');
const map = require('map-stream');
const remap = function(file, cb) {
  file.path = path.parse(file.path).base;
  cb(null, file);
};
const PLUGIN_NAME = 'Eleventy-Plugin-Sass';
const PLUGIN_SHORT = 'PS';
const defaultOptions = {
  watch: ['**/*.{scss,sass}', '!node_modules/**'],
  sourcemaps: false,
  cleanCSS: true,
  cleanCSSOptions: {},
  sassOptions: {},
  autoprefixer: true,
  outputDir: undefined,
  remap: false,
  compiler: require('sass'),
  onError: null,
};

function monkeypatch(cls, fn) {
  const orig = cls.prototype[fn.name][`_${PLUGIN_SHORT}_original`] || cls.prototype[fn.name];

  function wrapped() {
    return fn.bind(this, orig).apply(this, arguments);
  }

  wrapped[`_${PLUGIN_SHORT}_original`] = orig;

  cls.prototype[fn.name] = wrapped;
}

const compileSass = _debounce(function(eleventyInstance, options) {
  console.log(`[${chalk.red(PLUGIN_NAME)}] Compiling Sass files...`);
  const sass = require('gulp-sass')(options.compiler);
  vfs.src(options.watch)
    .pipe(gulpIf(options.sourcemaps, sourcemaps.init()))
    .pipe(sass(options.sassOptions).on('error', options.onError || sass.logError))
    .pipe(gulpIf(options.autoprefixer, prefix()))
    .pipe(gulpIf(options.cleanCSS, cleanCSS(options.cleanCSSOptions)))
    .pipe(gulpIf(options.sourcemaps, sourcemaps.write('.')))
    .pipe(gulpIf(options.remap, map(remap)))
    //.pipe(vfs.dest((options.outputDir || eleventyInstance.outputDir), {nodir: true}))
    .pipe(vfs.dest((options.outputDir), {nodir: true}))
    .on('end', function() {
      console.log(`[${chalk.red(PLUGIN_NAME)}] Done compiling Sass files`);
      //eleventyInstance.eleventyServe.reload('*.css');
    });
}, 500);

function initializeWatcher(eleventyInstance, options) {
  let firstRun = true;
  const watcher = chokidar.watch(options.watch, {
    persistent: true
  });
  watcher
    .on('add', path => {
      if (!firstRun) {
      }
      firstRun = false;
      compileSass(eleventyInstance, options);
    })
    .on('change', path => {
      compileSass(eleventyInstance, options);
    });
}

module.exports = {
  initArguments: {},
  configFunction: function(eleventyConfig, options) {

    options = {...defaultOptions, ...options};

    eleventyConfig.on('eleventy.before', async () => {
      compileSass(null, options);
    });

    // ... changes should only be CSS, allowing eleventy to optimize for *.css only reloads.
    eleventyConfig.addWatchTarget(options.outputDir);

    // TODO: Figure out how to initialize watch properly without monkey-patching.

  }
};
