var gulp = require("gulp");
var util = require("gulp-util");

var config = require("../config")

gulp.task("watch", () => {

	gulp.watch(`${config.src.ts}`, ["compile:ts"]).on("change", reportChange).on("error", swallowError);
	
	gulp.watch(`${config.test.files}`, ["compile:test"]).on("change", reportChange).on("error", swallowError);

});

function reportChange(event) {
	console.log(`File ${event.path} was ${event.type}, running tasks...`);
}

function swallowError(error) {
	console.log(util.colors.red(`Error occurred while running watched task...`));
}