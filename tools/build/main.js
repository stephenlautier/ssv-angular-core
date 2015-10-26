
var gulp = require("gulp");
var gutil = require("gulp-util");

var config = require("./config")

require("require-dir")("./tasks");

gulp.task("default", () => {

	console.log(gutil.colors.green(`\n======== ${config.packageName} ========\n`));
	
	console.log("tasks");
	console.log(" - build :: cleans and build.");
	console.log(" - clean :: cleans everything.");
	console.log(" - prepare-release --bump minor :: Does all stuff which needs to be done in order to create a new version. (bump major|minor|patch|prerelease)");
	console.log(" - test :: run the tests once.");
	console.log(" - tdd :: run the tests and keep watching.");
	console.log(" - lint :: gives you a delicious chocolate.");
	console.log(" - doc :: generates the api doc.");
	
	console.log("\n");
});