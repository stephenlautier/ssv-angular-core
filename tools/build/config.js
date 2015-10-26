var path = require("path");
var fs = require("fs");

var pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
var appRoot = "src";
//var sampleRoot = "sample";
const tsdMainFile = "tools/typings/tsd.d.ts";

module.exports = {
	root: appRoot,
	output: "dist",
	artifact: "_artifact",
	src: {
		ts: `${appRoot}/**/*.ts`,
		tsd: tsdMainFile
	},
	test: {
		files: `${appRoot}/**/*.spec.{ts,d.ts}`,
		karmaConfig: "karma.conf.js",
		output: "_artifact/test/unit"
	},
	doc: "./doc",
	packageName: pkg.name,
	// sample: {
	// 	root: sampleRoot,
	// 	outputRoot: `${sampleRoot}/dist`,
	// 	output: {
	// 		app: `${sampleRoot}/dist/app`,
	// 		lib: `${sampleRoot}/dist/lib`,
	// 		dts: `tools/typings/${pkg.name}`,
	// 		appFileName: "app-build.js"
	// 	},
	// 	src: {
	// 		ts: [tsdMainFile, `${sampleRoot}/src/**/*.ts`],
	// 		html: [`${sampleRoot}/**/*.html`],
	// 	}
	// }
};