var gulp = require("gulp");
var del = require("del");
var runSeq = require("run-sequence");

var config = require("../config");


gulp.task("clean", (cb) => {
	return runSeq(
		["clean:dist", "clean:artifact"],
		cb);
});


gulp.task("clean:dist", () => {
	return del(config.output)
});

gulp.task("clean:artifact", () => {
	return del(config.artifact)
});