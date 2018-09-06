const gulp = require("gulp");
const uglify = require("gulp-uglify");

gulp.task("message", () => {
  console.log("Gulp is running...");
});

//this will only minify the app.js file into "build" folder
gulp.task("minify", () => {
  gulp
    .src("src/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/"));
});
