const { src, dest, parallel, series, watch } = require("gulp");

const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default; // Сжимаем JavaScript
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css"); // Сжимаем CSS
const pug = require("gulp-pug");
const imagecomp = require("compress-images");
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

function html() {
  return src("src/pug/index.pug")
    .pipe(pug({}))
    .pipe(concat("index.html"))
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
async function images() {
  imagecomp(
    "src/img/**/**/**/*",
    "build/img/",
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } },
    { png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (err, completed) {
      if (completed === true) {
        browserSync.reload();
      }
    }
  );
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
  watch("src/scss/*.scss", styles);
  watch("src/pug/**/*.pug", html);
  watch("src/img/**/*", images);
  // watch("src/fonts/**/*", fonts);
}

// exports.cleanimg = cleanimg;
// exports.cleanbuild = cleanbuild;

// default
exports.html = html;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.browsersync = browsersync;

exports.default = parallel(
  html,
  scripts,
  styles,
  images,
  browsersync,
  startwatch
);
