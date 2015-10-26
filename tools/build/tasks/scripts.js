var gulp = require("gulp");
var runSeq = require("run-sequence");
var merge = require("merge2");
var typescript = require("typescript");
var dtsGen = require("dts-generator");
var Builder = require("systemjs-builder");

var tsc = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");
var ngAnnotate = require("gulp-ng-annotate");

var config = require("../config");

var tsProject = tsc.createProject("tsconfig.json", {
	sortOutput: true,
	typescript: typescript
});

gulp.task("scripts", (cb) => {
	return runSeq(
		["compile:ts", "compile:dts"],
		cb);
});

gulp.task("scripts:rel", (cb) => {

	return runSeq(
		"build",
		"compile:bundle",
		"scripts:copy-dist",
		cb);
});

gulp.task("compile:ts", () => {

	var tsResult = gulp.src([config.src.tsd, config.src.ts, `!${config.test.files}`])
		.pipe(plumber())
	//.pipe(changed(config.dist.appJs, { extension: ".js" }))
		.pipe(sourcemaps.init())
		.pipe(tsc(tsProject));

	return merge([
		tsResult.js
			.pipe(ngAnnotate())
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest(`${config.artifact}/amd`)),
		// tsResult.dts
		// 	.pipe(gulp.dest(config.artifact))
	]);
});

// d.ts generation using dts-generator
gulp.task("compile:dts", () => {
	return dtsGen.generate({
		name: `${config.packageName}`,
		baseDir: `${config.root}/`,
		files: ["./index.ts", `../${config.src.tsd}`],
		out: `${config.artifact}/${config.packageName}.d.ts`,
		main: `${config.packageName}/index`,
		//externs: ["../angularjs/angular.d.ts"]
	}, (msg) => {
		console.log(`Generating ${config.packageName}.d.ts: ${msg}`);
	});
});


gulp.task("compile:bundle", () => {

	var builder = new Builder(".", "system.config.js");

	return builder
		.buildStatic(`${config.packageName} - angular`,
			`${config.output}/amd-bundle/${config.packageName}.js`,
			{ format: "amd", sourceMaps: true });
		
	// return builder
	// 	.bundle(`${config.packageName} - angular`,
	// 	`${config.output}/${config.packageName}.js`,
	// 	{ format: "amd", sourceMaps: true });
});

gulp.task("scripts:copy-dist", () => {
	return gulp.src([`${config.artifact}/**/*`, `!${config.test.output}/**/*`])
		.pipe(gulp.dest(config.output));
});