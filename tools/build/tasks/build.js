var gulp = require("gulp");
var runSeq = require("run-sequence");

var config = require("../config");

gulp.task("build", (cb) => {

	return runSeq(
		"scripts",
		cb);
});

gulp.task("build:rel", (cb) => {

	return runSeq(
		"scripts:rel",
		cb);
});