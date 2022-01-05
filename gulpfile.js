const { src, dest, parallel, series, watch } = require("gulp");

const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default; // Сжимаем JavaScript
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css"); // Сжимаем CSS
const pug = require("gulp-pug");
const imagemin = require("gulp-imagemin");
const del = require("del");

function browsersync() {
  browserSync.init({
    server: { baseDir: "build/" },
    notify: false,
    online: true,
    cors: true,
    ui: false,
  });
}

function htmlIndex() {
  return src("src/pug/index.pug")
    .pipe(pug({}))
    .pipe(concat("index.html"))
    .pipe(dest("build/"))
    .pipe(browserSync.stream());
}
function htmlCatalog() {
  return src("src/pug/sections/catalog/catalog.pug")
    .pipe(pug({}))
    .pipe(concat("catalog.html"))
    .pipe(dest("build/"))
    .pipe(browserSync.stream());
}
function htmlForm() {
  return src("src/pug/sections/form/form.pug")
    .pipe(pug({}))
    .pipe(concat("form.html"))
    .pipe(dest("build/"))
    .pipe(browserSync.stream());
}
function scripts() {
  return src("src/js/script.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(dest("build/js/"))
    .pipe(browserSync.stream());
}
function styles() {
  return src("src/scss/styles.scss")
    .pipe(sass())
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: [],
        grid: true,
      })
    )
    .pipe(
      cleancss({
        level: { 1: { specialComments: 0 } } /* , format: 'beautify' */,
      })
    )
    .pipe(dest("build/css/"))
    .pipe(browserSync.stream());
}
function images() {
  return src("src/img/**/*.{jpg,png,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.mozjpeg({ progressive: true }),
        imagemin.svgo(),
      ])
    )
    .pipe(dest("build/img/"))
    .pipe(browserSync.stream());
}

// function fonts() {
//   return src("dev/fonts/**/*").pipe(dest("build/fonts/"));
// }

// function cleanimg() {
//   return del("src/img/**/**/**/*", { force: true });
// }

function cleanbuild() {
  return del("build/**/*", { force: true });
}

function startwatch() {
  watch("src/js/*.js", scripts);
  watch("src/scss/**/**/*.scss", styles);
  watch("src/pug/**/**/*.pug", htmlIndex, htmlCatalog, htmlForm);
  watch("src/img/**/*", images);
  // watch("src/fonts/**/*", fonts);
}

// exports.cleanimg = cleanimg;
// exports.cleanbuild = cleanbuild;

// default
exports.htmlIndex = htmlIndex;
exports.htmlCatalog = htmlCatalog;
exports.htmlForm = htmlForm;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.browsersync = browsersync;

exports.default = parallel(
  htmlIndex,
  htmlCatalog,
  htmlForm,
  scripts,
  styles,
  images,
  browsersync,
  startwatch
);
