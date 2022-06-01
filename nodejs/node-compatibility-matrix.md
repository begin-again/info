It can be time consuming to determine a package's compatibility with nodeJS. Thus rather than duplicating work, this chart will be maintained as a first check before venturing out to the web.

Each npm package will have its own row. The vXX columns are populated by first version of the package which supports that version of NodeJS. If there is no version constraint, the entry for that column is blank. All modules should have at least one entry. If a specific minor version of NodeJS is required it should be specified in parens.

The presence on an asterisk next to a package name means there is additional information in the [notes](#notes) section below.

The package names should be kept in alphabetical order.

| package name                                                                                                                  |     v8     |     v10     |     v12     |   v14   |  v16  |  v18  |
| :---------------------------------------------------------------------------------------------------------------------------- | :--------: | :---------: | :---------: | :-----: | :---: | :---: |
| [@babel/core](https://github.com/babel/babel/blob/main/CHANGELOG.md)                                                          |
| [@babel/eslint-parser](https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser)                                   |
| [@mdi/font]()                                                                                                                 |
| [@oktokit/rest](https://github.com/octokit/rest.js)                                                                           |     18     |
| [@testing-library/jest-dom](https://github.com/testing-library/jest-dom)                                                      |
| [@testing-library/user-event](https://github.com/testing-library/user-event)                                                  |
| [@testing-library/vue](https://github.com/testing-library/vue-testing-library)                                                |
| [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) |            |      3      |
| [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)               |            |      3      |
| [@vue/cli-plugin-babel](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-babel)                             |
| [@vue/cli-plugin-eslint](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint)                           |
| [@vue/cli-plugin-router](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router)                         |
| [@vue/cli-plugin-vuex](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex)                             |
| [@vue/cli-service](https://github.com/vuejs/vue-cli/blob/dev/CHANGELOG.md)                                                    |
| [@vue/vue-jest](https://github.com/vuejs/vue-jest)                                                                            |
| [@vue/vue3-jest](https://github.com/vuejs/vue-jest)                                                                           |
| [adm-zip](https://github.com/cthackers/adm-zip)                                                                               |    0.4     |
| [angular](https://github.com/angular/angular), [releases](./angular-releases)                                                 |  6 (8.9)   |  7 (10.9)   |             |   12    |
| [ansi-colors](https://github.com/doowb/ansi-colors)                                                                           |     4      |
| [async](https://github.com/caolan/async/blob/master/CHANGELOG.md)                                                             |
| [autoprefixer](https://github.com/postcss/autoprefixer)                                                                       |     7      |    9.8.7    |
| [axios](https://github.com/axios/axios/blob/master/CHANGELOG.md)                                                              |
| [babel-eslint](https://github.com/babel/babel-eslint)                                                                         |
| [babel-jest](https://github.com/facebook/jest/tree/main/packages/babel-jest)                                                  |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js)                                                                              |
| [chai](https://github.com/chaijs/chai)                                                                                        |     3      |             |      5      |
| [chalk](https://github.com/chalk/chalk)*                                                                                      |     3      |      4      | 4.1 (12.17) |
| [config-webpack](https://github.com/arthanzel/node-config-webpack)                                                            |
| [config](https://github.com/node-config/node-config)                                                                          |
| [copyfiles](https://github.com/calvinmetcalf/copyfiles)                                                                       |
| [core-js](https://github.com/zloirock/core-js/blob/master/CHANGELOG.md)                                                       |
| [cross-env](https://github.com/kentcdodds/cross-env) A                                                                        |
| [cssnano](https://github.com/cssnano/cssnano)                                                                                 |     3      |  5 (10.13)  |
| [del](https://github.com/sindresorhus/del)                                                                                    |     5      |      6      |
| [dotenv](https://github.com/motdotla/dotenv)                                                                                  |     5      |      9      |
| [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html/blob/main/CHANGELOG.md)                             |
| [eslint-plugin-pug](https://github.com/unrelentingtech/eslint-plugin-pug)                                                     |
| [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)                                                               |
| [eslint](https://github.com/eslint/eslint)*                                                                                   |     4      |     6.6     |
| [fancy-log](https://github.com/gulpjs/fancy-log)                                                                              |    1.3     |
| [gulp-cache-bust](https://github.com/furzeface/gulp-cache-bust)                                                               |    1.4     |
| [gulp-change](https://github.com/PoliteJS/gulp-change)                                                                        |   1.0.2    |
| [gulp-clean-css](https://github.com/scniro/gulp-clean-css)                                                                    |   4.0.0    |
| [gulp-concat](https://github.com/gulp-community/gulp-concat)                                                                  |   2.6.1    |
| [gulp-css](https://classic.yarnpkg.com/en/package/gulp-css)                                                                   |   0.1.0    |
| [gulp-debug](https://github.com/sindresorhus/gulp-debug)                                                                      |     4      |
| [gulp-eslint](https://github.com/adametry/gulp-eslint)*                                                                       |     5      |      6      |
| [gulp-filter](https://github.com/sindresorhus/gulp-filter)*                                                                   | 6 (8.12.0) |             |      7      |
| [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin)                                                                 |     5      |
| [gulp-if](https://github.com/robrich/gulp-if)                                                                                 |     2      |
| [gulp-postcss](https://github.com/postcss/gulp-postcss)                                                                       |     7      |
| [gulp-rename](https://github.com/hparra/gulp-rename)                                                                          |    1.4     |
| [gulp-tap](https://github.com/geejs/gulp-tap)                                                                                 |     1      |
| [gulp-uglify](https://github.com/terinjokes/gulp-uglify)*                                                                     |     3      |
| [gulp-wrap](https://github.com/adamayres/gulp-wrap)                                                                           |    0.14    |
| [gulp](https://github.com/gulpjs/gulp)                                                                                        |     3      |
| [gulp](https://github.com/gulpjs/gulp)                                                                                        |   4.0.2    |
| [jasmine-core](https://github.com/jasmine/jasmine)                                                                            |            |      3      |
| [jasmine](https://github.com/jasmine/jasmine-npm)                                                                             |            |      3      |
| [jest](https://github.com/facebook/jest/blob/main/CHANGELOG.md)                                                               |
| [jQuery](https://github.com/jquery/jquery)                                                                                    |     2      |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken/blob/master/CHANGELOG.md)                                           |
| [karma-chrome-launcher](https://github.com/karma-runner/karma-chrome-launcher)                                                |     3      |
| [karma-coverage](https://github.com/karma-runner/karma-coverage)                                                              |   1.1.2    |      2      |
| [karma-edge-launcher](https://github.com/karma-runner/karma-edge-launcher)                                                    |   0.4.2    |
| [karma-firefox-launcher](https://github.com/karma-runner/karma-firefox-launcher)                                              |   1.2.0    |      2      |
| [karma-ie-launcher](https://github.com/karma-runner/karma-ie-launcher)                                                        |   1.0.0    |
| [karma-jasmine](https://github.com/karma-runner/karma-jasmine)                                                                |   2.0.1    |      4      |
| [karma-ng-html2js-preprocessor](https://github.com/karma-runner/karma-ng-html2js-preprocessor)                                |   1.0.0    |
| [karma-safari-launcher](https://github.com/karma-runner/karma-safari-launcher)                                                |   1.0.0    |
| [karma-summary-reporter](https://github.com/sth/karma-summary-reporter)                                                       |    1.6     |     2.0     |
| [karma](https://github.com/karma-runner/karma)                                                                                |     3      |      5      |
| [lodash](https://github.com/lodash/lodash)                                                                                    |
| [log4js](https://github.com/log4js-node/log4js-node)                                                                          |     3      |
| [luxon](https://github.com/moment/luxon)                                                                                      |     1      |             |      2      |
| [material-design-icons-iconfont](https://github.com/jossef/material-design-icons-iconfont)                                    |
| [merge-stream](https://github.com/grncdr/merge-stream)                                                                        |   1.0.1    |
| [mocha](https://github.com/mochajs/mocha)                                                                                     |     5      |  8 (10.12)  |             | 9 (>10) |
| [mock-fs](https://github.com/tschaub/mock-fs)                                                                                 |     3      |             |      5      |
| [mock-require](https://github.com/boblauer/mock-require)                                                                      |     3      |
| [moment](https://github.com/moment/moment)                                                                                    |     2      |
| [msw](https://github.com/mswjs/msw)                                                                                           |
| [nanoid](https://github.com/ai/nanoid/blob/main/CHANGELOG.md)                                                                 |
| [npm-run-all](https://github.com/mysticatea/npm-run-all)                                                                      |
| [nyc](https://github.com/istanbuljs/nyc)                                                                                      |     12     |
| [playwright](https://github.com/microsoft/playwright)                                                                         |     --     | 1.0 (10.16) |
| [proxyquire](https://github.com/thlorenz/proxyquire)                                                                          |     2      |
| [randomatic](https://github.com/jonschlinkert/randomatic)                                                                     |     3      |
| [roboto-fontface](https://github.com/choffmeister/roboto-fontface-bower) A                                                    |
| [sass-loader](https://github.com/webpack-contrib/sass-loader/blob/master/CHANGELOG.md)                                        |
| [sass](https://github.com/sass/dart-sass/blob/main/CHANGELOG.md)                                                              |
| [semver](https://github.com/npm/node-semver)                                                                                  |     5      |      7      |
| [shelljs](https://github.com/shelljs/shelljs)                                                                                 |    0.7     |
| [sinon-chai](https://github.com/domenic/sinon-chai)                                                                           |    3.4     |     3.5     |
| [sinon](https://github.com/sinonjs/sinon)                                                                                     |     6      |      9      |
| [socket.io-client](https://github.com/socketio/socket.io-client/blob/master/CHANGELOG.md)                                     |
| [time-stamp](https://github.com/jonschlinkert/time-stamp)                                                                     |     2      |
| [tiny-emitter](https://github.com/scottcorgan/tiny-emitter)                                                                   |
| [typescript](https://github.com/Microsoft/TypeScript)                                                                         |     2      |
| [uuid](https://github.com/uuidjs/uuid)                                                                                        |    3.2     |
| [vinyl-paths](https://github.com/sindresorhus/vinyl-paths)                                                                    |     3      |
| [vue-axios](https://github.com/imcvampire/vue-axios)                                                                          |
| [vue-cli-plugin-pug](https://github.com/jaeming/vue-cli-plugin-pug)                                                           |
| [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugins)                                                        |
| [vue-grid-layout](https://github.com/jbaysolutions/vue-grid-layout)                                                           |
| [vue-i18n](https://github.com/kazupon/vue-i18n)                                                                               |
| [vue-router](https://github.com/vuejs/router)                                                                                 |
| [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler)                                 |
| [vue](https://github.com/vuejs/core)                                                                                          |
| [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader)                                                                 |
| [vuetify](https://github.com/vuetifyjs/vuetify)                                                                               |
| [vuex](https://github.com/vuejs/vuex/blob/main/CHANGELOG.md)                                                                  |
| [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file)                                           |     4      |
| [winston](https://github.com/winstonjs/winston)                                                                               |     3      |
| [yargs](https://github.com/yargs/yargs)*                                                                                      |     12     |     16      |     17      |


<hr>

## notes

- chalk
  - replace with [ansi-colors](https://github.com/doowb/ansi-colors).
- eslint
  - v6.6.0 includes a dependency on chalk @4 which requires node >= 10
- gulp-eslint
  - v6.0.0 includes a dependency on eslint/inquirer which depends on chalk v4
- gulp-filter
  - v5.1 works fine on >=8.11.1
  - v6 does not install on node <8.12.0 due to it's [streamfilter](https://github.com/nfroidure/streamfilter/blob/373da8fa746a054f501ab34bb9feba74da226a84/package.json#L74) dependency.
- gulp-uglify
  - Supports parsing of [ES5 Only](https://github.com/mishoo/UglifyJS/tree/v3.0.0#note)
- yargs
  - v16 is significantly different in regards to [command parsing](https://github.com/yargs/yargs/blob/master/docs/advanced.md)
