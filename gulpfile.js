const gulp = require("gulp");
const sourceMaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");

/* PostCSS Plugins for processing our CSS */
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const customProperties = require("postcss-custom-properties");
const cssImports = require("postcss-import");

/* Pug handles our HTML templates */
const pug = require("gulp-pug");

/* Babel will transpile our fancy JavaScript for older browser support */
const babel = require("gulp-babel");

// Process our CSS files
// Combine Imports, process custom properties, add prefixes
gulp.task("css", function() {
  const plugins = [cssImports(), customProperties(), autoprefixer({ browsers: ["last 1 version"] })];

  return gulp
    .src("./css/styles.css")
    .pipe(sourceMaps.init())
    .pipe(postcss(plugins))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("css:watch", function() {
  gulp.watch("./css/*.css", ["css"]);
});

// Convert all the Pug templates to HTML files
gulp.task("pug", function() {
  return gulp
    .src("./templates/*.pug")
    .pipe(pug()) // pipe to pug plugin
    .pipe(gulp.dest("./dist")); // tell gulp our output folder
});

// Watch for changes in the templates folder and rerun the pug task
gulp.task("pug:watch", function() {
  gulp.watch("./templates/**/*.pug", ["pug"]);
});

// Process JS files
gulp.task("js", function() {
  return gulp
    .src("./js/*.js")
    .pipe(babel({ presets: ["env"] }))
    .pipe(gulp.dest("./dist/js")); // tell gulp our output folder
});

// Watch for changes in the templates folder and rerun the pug task
gulp.task("js:watch", function() {
  gulp.watch("./js/*.js", ["js"]);
});

// Copy images in to the ./dist folder
gulp.task("images", function() {
  return gulp.src("./images/*").pipe(gulp.dest("./dist/images"));
});

gulp.task("dev", ["css", "js", "pug", "images", "css:watch", "js:watch", "pug:watch"]);

gulp.task("default", ["dev"]);
