// Karma configuration
// Generated on Mon Oct 19 2015 18:30:53 GMT+0200 (W. Europe Daylight Time)
var path = require("path");
var conf = require("./tools/build/config");

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter    
    frameworks: ["jspm", "jasmine"],

    jspm: {
      config: "system.config.js",
      //packages: "jspm_packages/",
      loadFiles: [`${conf.artifact}/**/*.js`],
      paths: {
        "*": "*.js",
        "test-setup": `${conf.test.output}/test-setup.spec.js`,
        "*.spec.js": `${config.artifact}/test/*.js`
      }
    },

    proxies: {
      //"/_artifact/test/unit/": "/base/_artifact/test/unit/",
      "/_artifact/": "/base/_artifact/",
      "/jspm_packages/": "/base/jspm_packages/",
    },

  
    // list of files / patterns to load in the browser
    files: [
      "node_modules/jasmine-es6-promise-matchers/jasmine-es6-promise-matchers.js",
      //"_artifact/test/unit/test-setup.spec.js",
      {
        pattern: `${conf.artifact}/**/*.js.map`,
        included: false
      }],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["mocha"],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
