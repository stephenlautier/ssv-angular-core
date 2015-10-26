var gulp = require("gulp");
var path = require("path");
var runSeq = require("run-sequence");
var merge = require("merge2");
var typescript = require("typescript");
var karmaSrv = require("karma").Server;

var gutil = require("gulp-util");
var tsc = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");


var config = require("../config");

var tsProject = tsc.createProject("tsconfig.json", {
	sortOutput: true,
	typescript: typescript
});

gulp.task("test", ["compile:test"], (cb) => {
	runTests(true, cb);
});

gulp.task("tdd", ["compile:test"], (cb) => {
	runTests(false, cb);
});

function runTests(singleRun, cb) {

	new karmaSrv({
		configFile: path.join(__dirname, `../../../${config.test.karmaConfig}`),
		singleRun: singleRun,
		autoWatch: !singleRun,
	}, (code) => {
		// make sure failed karma tests cause gulp to exit non-zero
		if (code === 1) {
			gutil.log(gutil.colors.red("------- Error: unit test failed -------"));
			return process.exit(1);
		}
		cb();
	}).start();
}


gulp.task("compile:test", () => {
	var tsResult = gulp.src([config.src.tsd, config.test.files])
		.pipe(plumber())
	//.pipe(changed(config.test.output, { extension: ".js" }))
		.pipe(sourcemaps.init())
		.pipe(tsc(tsProject));

	return merge([
		tsResult.js
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest(config.test.output))
	]);
});