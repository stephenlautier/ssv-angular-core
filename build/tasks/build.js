var gulp = require("gulp");
var runSeq = require("run-sequence");
var merge = require("merge2");
var typescript = require("typescript");
var tsc = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");
var dtsGen = require("dts-generator");
var jspm = require("jspm");
//var rjsOpt = require("gulp-requirejs-optimize");

var paths = require("../paths");


var tsProject = tsc.createProject("tsconfig.json", {
	sortOutput: true,
	typescript: typescript
});

gulp.task("build", (cb) => {

	return runSeq(
		["compile:ts", "compile:dts"],
		cb);
});

gulp.task("build:rel", (cb) => {

	return runSeq(
		"clean",
		"build",
		"compile:bundle",
		cb);
});

gulp.task("compile:ts", () => {

	var tsResult = gulp.src([paths.src.tsd, paths.src.ts])
		.pipe(plumber())
	//.pipe(changed(paths.dist.appJs, { extension: ".js" }))
		.pipe(sourcemaps.init())
		.pipe(tsc(tsProject));

	return merge([
		tsResult.js
			.pipe(sourcemaps.write("."))
			.pipe(gulp.dest(paths.artifact)),
		// tsResult.dts
		// 	.pipe(gulp.dest(paths.artifact))
	]);
});

// d.ts generation using dts-generator
gulp.task("compile:dts", () => {
	return dtsGen.generate({
		name: `${paths.packageName}`,
		baseDir: `${paths.root}/`,
		files: ["./index.ts", "../tools/typings/tsd.d.ts"],
		out: `${paths.output}/${paths.packageName}.d.ts`,
		main: `${paths.packageName}/index`,
		externs: ["../angularjs/angular.d.ts"]
	}, (msg) => {
		console.log(`Generating ${paths.packageName}.d.ts: ${msg}`);
	});
});


gulp.task("compile:bundle", () => {

	jspm.setPackagePath(".")
	
	// return gulp.src(`${paths.artifact}/index.js`)
	// 	.pipe(rjsOpt({
	// 		name: "index",
	// 		paths: {
	// 			angular: "empty:"
	// 		},
	// 		optimize: "none"
	// 	}))
	// 	.pipe(gulp.dest(`dist`))
		

	// var builder = new jspm.Builder();
	// return builder.bundle(
	// 	`${paths.packageName}`,
	// 	`${paths.output}/${paths.packageName}.js`
	// 	);
	
	// var builder = new jspm.Builder();
	// return builder.buildStatic(
	// 	`${paths.packageName}`,
	// 	`${paths.output}/${paths.packageName}.js`, {
	// 		format: "amd",
	// 		sourceMaps: true, 
	// 		lowResSourceMaps: true,
	// 		// minify: true, 
	// 		mangle: false,
	// 		runtime: false
	// 	})

	return jspm.bundle(`${paths.packageName}`,
		`${paths.output}/${paths.packageName}.js`, {
			mangle: false,
			inject: false,
			sourceMaps: true			
		});
});