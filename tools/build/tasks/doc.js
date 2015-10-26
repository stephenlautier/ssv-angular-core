var gulp = require("gulp");
var typedoc = require("gulp-typedoc");

var config = require("../config");

gulp.task("doc", () => {
	return gulp.src([config.src.tsd, config.src.ts, `!${config.test.files}`])
		.pipe(typedoc({
			module: "amd",
			target: "es5",
			includeDeclarations: true,
			excludeExternals: true,
			
			out: `${config.doc}/api`,
			mode: "modules",
			
			name: config.packageName,
			version: true
		}));
});