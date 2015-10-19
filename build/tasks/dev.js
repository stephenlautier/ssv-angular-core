var gulp = require("gulp");
var util = require("gulp-util");

var paths = require("../paths")

gulp.task("watch", ["serve"], () => {

	gulp.watch(`${paths.src.ts}`, ["build"]).on("change", reportChange).on("error", swallowError);

});

function reportChange(event) {
	console.log(`File ${event.path} was ${event.type}, running tasks...`);
}

function swallowError(error) {
	console.log(util.colors.red(`Error occurred while running watched task...`));
}