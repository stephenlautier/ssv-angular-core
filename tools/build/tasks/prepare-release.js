var gulp = require("gulp");
var runSeq = require("run-sequence");
var fs = require("fs");
var changelog = require("conventional-changelog");

var bump = require("gulp-bump");

var args = require("../args");
var config = require("../config");

gulp.task("prepare-release", (cb) => {
	return runSeq(
		"clean",
		"build:rel",
		"lint",
		"bump-version",
		"doc",
		"changelog",
		cb);
});

gulp.task("bump-version", () => {
	return gulp.src(["./package.json", "./bower.json"])
		.pipe(bump({ type: args.bump })) //major|minor|patch|prerelease
		.pipe(gulp.dest("./"));
});

gulp.task("changelog", () => {

	return changelog({
		preset: "angular",
		releaseCount: 0
	})
		.pipe(fs.createWriteStream(`${config.doc}/CHANGELOG.md`));
});