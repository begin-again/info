__Unit Testing with AngularJS__

- [Jasmine](#jasmine)
  - [Suites & Test](#suites--test)
    - [Disabling Suites & Tests](#disabling-suites--tests)
  - [Hooks](#hooks)
  - [Matchers](#matchers)
  - [Spies](#spies)
- [Karma](#karma)
  - [Configuration](#configuration)
- [packages](#packages)
  - [Running tests](#running-tests)
- [How to write tests](#how-to-write-tests)


## Jasmine

Jasmine is a testing framework. Even though JavaScript is by nature asynchronous, jasmine tests are not. This makes it much easier to test.

[Jasmine tutorial](https://jasmine.github.io/tutorials/your_first_suite)

### Suites & Test

A suite begins with a describe() which encapsulates additional suites and specs (tests).

```javascript
describe('some text about the contents', function(){
  // we can do anything in this space that we could do in any function

  describe('more specific suite', function(){
    it('brief description of what is being tested and how it should behave', function(){
      // we can do anything in this space that we could do in any function

      expect( 1 === 1).toBeTruthy();
      expect( 1 === 2).not.toBeTruthy();
    });
  });
});
```

#### Disabling Suites & Tests

disable suite or test by pre-fixing an "x"
-   `xdescribe`, `xit`

focus a suite or test by prefixing an "f"
-   `fdescribe`, `fit`

a test without a second parameter is pending
-   `it('should do stuff');`

A test which contains a function called pending() is disabled

### Hooks

Allow us to set up and tear down between tests. They exist within Suites outside of tests. They run at the level of the suites which contain them.

```javascript
beforeEach(function(){
  // do something here before each test in the current and lower suites
});

afterEach(function(){
  // do something here after each test in the current and lower suites
});
```
See also: [Jasmine Hook Execution Order](./angularjs-testing-jasmine-hooks)

### Matchers

[Source](https://jasmine.github.io/api/3.3/matchers.html)

| Matcher                                                  | What Tested        | Use With                     | Example                                                                                                    |
| :------------------------------------------------------- | :----------------- | :--------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `toBe(<expected>)`                                       | `===`              | objects, primitives, boolean | `expect(1).toBe(1)`                                                                                        |
| `toBeCloseTo(<expected>, <number of decimals to check>)` | floating point     | floating point               | `expect(42.21).toBeCloseTo(42.2, 1)`                                                                       |
| `toBeDefined()`                                          | Not `undefined`    | any                          | `expect(myProperty).toBeDefined()`                                                                         |
| `toBeFalsy()`                                            | `==`               |                              | `expect(null).toBeFalsy()`                                                                                 |
| `toBeGreaterThan(<expected>)`                            | `>`                |                              | `expect(1).toBeGreaterThan(0)`                                                                             |
| `toBeGreaterThanOrEqual(<expected>)`                     | `>=`               |                              | `expect(1).toBeGreaterThanOrEqual(1)`                                                                      |
| `toBeLessThan(<expected>)`                               | `<`                |                              |                                                                                                            |
| `toBeLessThanOrEqual(<expected>)`                        | `=<`               |                              |                                                                                                            |
| `toBeNaN()`                                              | Not a Number       |                              |                                                                                                            |
| `toBeNegativeInfinity()`                                 | -Infinity          |                              |                                                                                                            |
| `toBeNull()`                                             | `=== Null`         |                              |                                                                                                            |
| `toBePositiveInfinity()`                                 | Infinity           |                              |
| `toBeThruthy()`                                          | `==`               |                              |                                                                                                            |
| `toContain(<expected>)`                                  | `indexOf > -1`     | strings, arrays, objects     | `expect(myArray).toContain(55)`                                                                            |
| `toEqual(<expected>)`                                    | `==`               | any                          | `expect(1).toEqual("1")`                                                                                   |
| `toHaveBeenCalled()`                                     | execution          | spies                        | `expect(mySpy).toHaveBeenCalled()`                                                                         |
| `toHaveBeenCalledBefore(<other spy>)`                    | execution          | spies                        | `expect(mySpy).toHaveBeenCalledBefore(myOtherSpy)`                                                         |
| `toHaveBeenCalledTimes(integer)`                         | execution          | spies                        | `expect(mySpy).toHaveBeenCalledTimes(5)`                                                                   |
| `toHaveBeenCalledWith(<payload>)`                        | execution          | spies                        | `expect(mySpy).tohaveBeenCalledWith("app|polling")`                                                        |
| `toMatch(<expression>)`                                  | `//`               | strings                      | `expect("my string").toMatch(/string/)`                                                                    |
| `toThrow(<foo>)`                                         | any exception      | functions                    | Use .bind(null, params...) when params needed. `expect(service.foo.bind(null, 123)).toThrow()`             |
| `toThrowError(<error>)`                                  | specific exception | functions                    | Use .bind(null, params...) when params needed. `expect(service.foo.bind(null, 123)).toThrow("badd error")` |

### Spies

A spy can stub any function and tracks calls to it and all arguments. A spy only exists in the `describe` or `it` block in which it is defined,
and will be removed after each spec

For an existing object:
`spyOn(object, 'method');`

for a new object:
`var x = jasmine.createSpy('name');`

[source](https://jasmine.github.io/api/3.3/Spy.html)

## Karma

Creates an angular environment in which one can run tests.

[karma](http://karma-runner.github.io/latest/index.html)

### Configuration

Create a config file in project root. Typically named `kamra.conf.js`

```js
module.exports = function(config) {
    config.set({
        basePath: 'src', // folder containing source code
        frameworks: ['jasmine'],
        files: [
            // libraries need by your app or tests. Notice the offset relative to basePath
            '../node_modules/jquery/dist/jquery.min.js',
            '../node_modules/angular/angular.js',

            // Src files
            'my.module.js',
            '**/*.js'

            // tests
            '../spec/unit/**/*.spec.js',

            // helpers - custom libs, fixtures, etc
            '../spec/helpers.js',

            // templates
            '**/*.html'
        ],
        exclude: [], // add files to exclude here
        preprocessors: {
             '**/*.html': ['ng-html2js'], // the lib loads the templates into a cache so angular can find them in memory
             '**/*/js': ['coverage'] // unit test coverage reporter
        },
        ngHtml2JsPreprocessor:{
            moduleName: "AppTemplates" // module name to use in cache
        },
        reporters: ['summary', 'coverage'], // tells karma what outputs are desired. Each of which may have their own configuration entries
        port: 9876, // default port for karma
        autowatch: true, // tells karma to re-run tests on any change to any entry in the files array. Will be ignored if singleRun is false
        browsers: ['Chrome'], // List default browser(s) to run tests in.
        customLaunchers: {}, // configure browsers with specific settings (ie., headless, sandbox, no-plugins)
        singleRun: true // Karma captures browsers, runs the tests and exits
    });
}
```

## packages

Dev

| Name                         | Purpose                                        | Dev/Depend |
| :--------------------------- | :--------------------------------------------- | :--------: |
| angular-mocks                | wrapper to enable mocking of angular objects   |    dev     |
| jasmine                      | test framework                                 |    dev     |
| jasmine-core                 |                                                |    dev     |
| karma                        | test runner                                    |    dev     |
| karma-chrome-launcher        | runs tests in chrome                           |    dev     |
| karma-edge-launcher          | runs tests in MS Edge                          |    dev     |
| karma-firefox-launcher       | runs tests in Firefox                          |    dev     |
| karma-safari-launcher        | runs tests in safari                           |    dev     |
| karma-ie-launcher            | run tests in IE                                |    dev     |
| karma-jasmine                | framework plugin support for jasmine           |    dev     |
| karma-coverage               | coverage reporter plugin                       |    dev     |
| karma-summary-reporter       | summarize test results for all browsers plugin |    dev     |
| karma-ng-html2js-prepocessor | caches templates                               |    dev     |
| jquery                       | replaces angular's built-in ngLite             |    dev     |
| angular                      | main lib                                       |   depend   |
| ...                          | all other libs needed for app                  |   depend   |

### Running tests

If karma is installed globably can call `karma` directly otherwise either reference it's relative path `./node_modules/path/to/karma/bin`in node_modules or call it through the package manager `yarn karma args`

package.json
```json
"scripts":{
    "test": "karma start karma.conf.js --no-single-run --reporters progress,html,coverage",
    "test:win": "karma start karma.conf.js --single-run --browsers Chrome,Firefox,Edge,IE --reporters summary,coverage",
    "test:mac": "karma start karma.conf.js --single-run --browsers Chrome,Firefox,Safari --reporters summary,coverage"
}
```

## How to write tests

* [Controllers](./angularjs-testing-controllers)
* [Factories](./angularjs-testing-factories)
* [Templates](./angularjs-testing-templates)
* [Mocking](./angularjs-testing-mocking)
