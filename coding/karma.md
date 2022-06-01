# Karma

## Common Errors

### You need to include some adapter that implements __karma__.start method!

*   `yarn install`
*   `karma start karma.conf.js --no-single-run --browsers PhantomJS --reporters progress,coverage`

### WARN \[web-server\]: 404: /\_assets/images/...

*   `logLevel: config.LOG_DEBUG`

## Configuration
`karma.conf.js`

```javascript
module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: ''

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        , frameworks: ['jasmine']

        // list of files / patterns to load in the browser
        , files: [
            // Libraries - ensure the versions match those of your application
            { pattern: 'node_modules/jquery/dist/jquery.min.js', watch: false}
            , { pattern: 'node_modules/angular/angular.js', watch: false}
            , { pattern: 'node_modules/angular-animate/angular-animate.js', watch: false}
            , { pattern: 'node_modules/angular-aria/angular-aria.js', watch: false}
            , { pattern: 'node_modules/angular-messages/angular-messages.js', watch: false}
            , { pattern: 'node_modules/angular-material/angular-material.js', watch: false}
            , { pattern: 'node_modules/angular-filter/dist/angular-filter.js', watch: false}
            , { pattern: 'node_modules/angular-mocks/angular-mocks.js', watch: false}
            , { pattern: 'node_modules/angular-material/angular-material-mocks.js', watch: false}
            , { pattern: 'node_modules/@uirouter/angularjs/release/angular-ui-router.js', watch: false}

            // App
            // sometimes it may be necessary to specify individual files
            , 'app/**/*.module.js'
            , 'app/**/*.js'

            // tests
            , 'spec/unit/**/*.spec.js'

            // templates
            , 'app/**/*.html'
        ]

        // list of files to exclude
        , exclude: ['app/index.html']

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        , preprocessors: {
            'app/**/*.html': ['ng-html2js']
            , 'app/**/*.js' : ['coverage']
        }

        , ngHtml2JsPreprocessor: {
            // If your build process changes the path to your templates,
            // use stripPrefix and prependPrefix to adjust it.
            //stripPrefix: "templates",
            prependPrefix: "/connect_client/"

            // the name of the Angular module to create
            , moduleName: "AppTemplates"
        }

        // test results reporter to use
        , reporters: ['dots', 'coverage']

        // Options for the coverage reporter
        , coverageReporter: {
            type: 'html'
            , dir: 'coverage/'
            , includeAllSources: true
        }

        // web server port
        , port: 9876

        // enable / disable colors in the output (reporters and logs)
        , colors: true

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        , logLevel: config.LOG_INFO

        // this is needed in order to ensure that console.log is displayed in all browsers
        , browserConsoleLogOptions: {
            level: 'log'
        }

        // enable watching files and executing tests whenever any file changes
        // will be ignored if singleRun is false. Keep this set to true.
        , autoWatch: true

        // start these browsers
        // Just list the PhantomJS browser. We will over-ride via scripts
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        , browsers: ['ChromeNoSandboxHeadless']

        // Leave this as-is even if not in Windows environment
        , customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox'
                , flags: [
                    '-headless'
                ]
            }
            , ChromeNoSandboxHeadless: {
                base: 'Chrome'
                , flags: [
                    '--no-sandbox'
                    // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
                    , '--headless'
                    , '--disable-gpu'
                    // Without a remote debugging port, Google Chrome exits immediately.
                    , ' --remote-debugging-port=9222'
                    , ],
            }
        }

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        , singleRun: true
    });
};


```
