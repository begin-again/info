# Personal ESlint Configuration File

1.  Install ESlint globally with yarn. `yarn global add eslint`
1.  Create a new file named `.eslintrc.yaml` in a parent folder of where your repository clones are kept.
1.  Install Atom [ESLint linter](https://atom.io/packages/linter-eslint)

Plugins have to be installed globally

See [NPM Repository for Plugins](https://yarnpkg.com/en/packages?q=eslint-plugin&p=1)
Note: Personal rules sets can cause errors in a repository's style tests so be sure not to over-ride repo rules with something more restrictive. When in doubt report as warning.

```yaml
---
parserOptions:
  sourceType: script
  ecmaFeatures:
    impliedStrict: true
parser: espree
env:
  browser: true
  jquery: true
  jasmine: true
plugins:
- angular
- jasmine
- jsdoc
- optimize-regex
- ie11
rules:
  ie11/no-collection-args:
  - error
  ie11/no-for-in-const:
  - error
  ie11/no-loop-func:
  - warn
  ie11/no-weak-collections:
  - error
  # angular/deferred: 1
  angular/component-limit: 1
  angular/controller-as-route: 1
  angular/controller-as-vm: 1
  angular/controller-as: 1
  angular/di-unused: 2
  angular/no-controller: 1
  angular/no-run-logic: 1
  angular/no-services:
  - 2
  - - "$http"
  angular/on-watch: 1
  angular/prefer-component: 1
  angular/no-directive-replace: 1
  angular/no-http-callback: 2
  angular/dumb-inject: 1
  angular/function-type:
  - 1
  - named
  angular/no-service-method: 1
  angular/watchers-execution:
  - 1
  - "$digest"
  angular/angularelement: 1
  angular/definedundefined: 1
  angular/document-service: 1
  angular/foreach: 1
  angular/interval-service: 1
  angular/json-functions: 1
  angular/log: 1
  angular/no-angular-mock: 1
  angular/no-jquery-angularelement: 1
  angular/timeout-service: 1
  angular/typecheck-array: 1
  angular/typecheck-date: 1
  angular/typecheck-function: 1
  angular/typecheck-number: 1
  angular/typecheck-object: 1
  angular/typecheck-string: 1
  angular/window-service: 1
  angular/on-destroy: 1
  jasmine/no-suite-dupes:
  - 1
  - branch
  jasmine/named-spy: 1
  jasmine/expect-matcher: 1
  jasmine/expect-single-argument: 1
  jasmine/new-line-before-expect: 1
  # jasmine/new-line-between-declarations: 1
  jasmine/no-assign-spyon: 1
  jasmine/no-disabled-tests: 1
  jasmine/no-expect-in-setup-teardown: 1
  # jasmine/no-focused-tests: 2
  jasmine/no-global-setup: 2
  jasmine/no-spec-dupes:
  - 1
  - branch
  jasmine/no-suite-callback-args: 2
  jasmine/no-unsafe-spy: 1
  jasmine/prefer-jasmine-matcher: 1
  jasmine/prefer-toHaveBeenCalledWith: 1
  jsdoc/check-param-names: 1
  jsdoc/check-tag-names: 1
  jsdoc/check-types: 1
  jsdoc/newline-after-description: 1
  jsdoc/require-hyphen-before-param-description: 1
  jsdoc/require-param: 1
  jsdoc/require-param-name: 1
  jsdoc/require-param-type: 1
  jsdoc/require-returns-description: 1
  jsdoc/require-returns-type: 1
  optimize-regex/optimize-regex: warn
  array-bracket-spacing:
  - warn
  - always
  block-scoped-var: error
  brace-style:
  - error
  - stroustrup
  - allowSingleLine: true
  camelcase: error
  comma-spacing:
  - warn
  - after: true
  comma-style:
  - error
  - first
  consistent-return: warn
  default-case: error
  dot-location:
  - error
  - property
  dot-notation:
  - error
  eqeqeq:
  - error
  - smart
  indent:
  - error
  - 4
  - MemberExpression: 1
    ArrayExpression: 1
    ObjectExpression: 1
  keyword-spacing:
  - warn
  - overrides:
      if:
        after: false
      for:
        after: false
      while:
        after: false
  line-comment-position:
  - error
  - position: above
  newline-per-chained-call:
  - error
  - ignoreChainWithDepth: 2
  no-alert:
  - error
  no-caller: error
  no-console: error
  no-div-regex: error
  no-dupe-args: error
  no-else-return:
  - warn
  - allowElseIf: false
  no-empty-function: error
  no-eq-null: error
  no-extra-boolean-cast:
  - error
  no-extra-semi:
  - warn
  no-fallthrough:
  - error
  no-floating-decimal: error
  no-func-assign:
  - error
  no-implicit-coercion:
  - error
  no-inner-declarations: error
  no-invalid-regexp:
  - error
  no-irregular-whitespace:
  - error
  - skipComments: true
  no-lone-blocks:
  - warn
  no-lonely-if: error
  no-magic-numbers:
  - error
  - ignore:
    - 1
    - 0
    - -1
    ignoreArrayIndexes: true
  no-multi-spaces: error
  no-redeclare: error
  no-regex-spaces:
  - error
  no-script-url: error
  no-self-assign: error
  no-self-compare:
  - error
  no-tabs: error
  no-trailing-spaces: error
  no-unneeded-ternary:
  - warn
  no-unreachable: error
  no-unsafe-negation:
  - error
  no-unused-vars:
  - warn
  - args: all
    caughtErrors: all
  no-useless-return: error
  object-curly-spacing:
  - warn
  - always
  prefer-promise-reject-errors: warn
  semi:
  - error
  - always
  - omitLastInOneLineBlock: true
  space-infix-ops:
  - warn
  space-unary-ops:
  - warn
  - words: true
    nonwords: false
  spaced-comment:
  - warn
  - always
  use-isnan:
  - error
  valid-typeof:
  - error
  vars-on-top: warn
  yoda: error
```
