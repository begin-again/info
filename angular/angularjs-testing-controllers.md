__Testing Controllers__

Only test public functions and properties. Monitor code coverage to ensure that tests are covering all possible results.

Controllers may have ajax, watches, nested scopes, and tightly coupled logic. This can make writing tests very challenging. A function which is difficult to test is a code smell that it need to be refactored.


- [Controller](#controller)
- [ControllerAs](#controlleras)
- [Component Controller](#component-controller)
- [Dealing with DOM issues](#dealing-with-dom-issues)

## Controller

1.  Setup the environment
1.  Load the module `beforeEach( module('<module name>'));`. The module must have already been created.
1.  Inject dependencies & and assign local variables. If the original name of the injected object is desired (should do this if multiple custom objects are involved), place an underscore before and after as `_SomeService_`
    -   $controller : invokes the controller
    -   $rootScope : create child scopes with $new
    -   Whatever else: services, constants, etc.
    ```js
    var scope;
    var rootScope;
    var timeout;
    var controller;
    var q;
    var RosterService;
    beforeEach( inject(function($controller, $timeout, $rootScope, $q, _RosterService_){
        controller = $controller;
        scope = $rootScope.$new();
        timeout = $timeout;
        rootScope = $rootScope;
        RosterService = _RosterService_;
        q = $q;
    }));
    ```
1.  Invoke the controller
    ```js
    beforeEach(function(){
        ctrl = controller('<name>', {scope: scope, SomeService: SomeService});
    });
    ```
1.  Setup any scope properties to desired state
    ```js
    rootScope.modalIsOpen = 99;
    scope.rosterLoading = 99;
    scope.advisees = 99;
    scope.filteredAdvisees = 99;
    scope.searchAdvisees = 99;
    scope.disableSearch = 99;
    ```
1.  Mock service calls since we are not testing their functions
    -   If service returns some data
    ```js
        spyOn(SomeService, 'getStuff').and.returnValue('some data');
    ```
    -   If service function is supposed to return a promise
    ```js
        spyOn(SomeService, 'getStuff').and.callFake(function(){
          var p = $q.defer();
          p.resolve([1]); //as appropriate
          return p.promise;
        });
    ```
1.  call the function
1.  execute $digest() to see updated properties or resolve promises;
    *   The `$onInit` function will not fire until the first `$digest()`
1.  verify mocks have been called
1. verify expectations
1. reset persistent properties to default states

```js
describe('rosterCtrl', function(){
    var scope;
    var rootScope;
    var timeout;
    var controller;
    var q;
    var RosterService;

    beforeEach( module('ACAngularModule'));

    beforeEach( inject(function($controller, $timeout, $rootScope, $q, _RosterService_){
        controller = $controller;
        scope = $rootScope.$new();
        timeout = $timeout;
        rootScope = $rootScope;
        RosterService = _RosterService_;
        q = $q;
    }));

    beforeEach(function(){
        controller('rosterCtrl', {$scope: scope, $rootScope: rootScope, RosterService: RosterService});
    });

    describe('Init()', function(){
        it('should initialize some properties and call getTerms()', function(){
            // watch 'searchAdvisees'
            spyOn(scope, 'setPage');
            spyOn(scope, 'pageCount');
            spyOn(rootScope, 'filterAdvisees');
            // watch 'selectedTerm'
            spyOn(rootScope, 'getAdviseeListing');
            spyOn(scope, 'clearSearch');

            // within this function
            spyOn(scope, 'getTerms');

            rootScope.modalIsOpen = 99;
            scope.rosterLoading = 99;
            scope.advisees = 99;
            scope.filteredAdvisees = 99;
            scope.searchAdvisees = 99;
            scope.disableSearch = 99;
            scope.init();

            expect(rootScope.modalIsOpen).toBe(false);
            expect(scope.rosterLoading).toEqual(0);
            expect(scope.advisees).toEqual([]);
            expect(scope.filteredAdvisees).toEqual([]);
            expect(scope.searchAdvisees).toEqual("");
            expect(scope.disableSearch).toEqual(true);
            expect(scope.getTerms).toHaveBeenCalled();
        });
    });
    describe('getTerms()', function(){
        it('should set terms & selectedTerm to empty arrays', function(){
            // watch 'searchAdvisees'
            spyOn(scope, 'setPage');
            spyOn(scope, 'pageCount');
            spyOn(rootScope, 'filterAdvisees');
            // watch 'selectedTerm'
            spyOn(rootScope, 'getAdviseeListing');
            spyOn(scope, 'clearSearch');

            scope.terms = 99;
            rootScope.selectedTerm = 99;
            spyOn(RosterService, 'getTerms').and.callFake(function(){
                var p = q.defer();
                p.reject(99);
                return p.promise;
            });

            scope.getTerms();
            scope.$apply();

            expect(scope.terms).toEqual([]);
            expect(rootScope.selectedTerm).toEqual([]);
            expect(Roster.getTerms).toHaveBeenCalled();
        });
    });
});
```

## ControllerAs

Same as traditional controller except that they do not use $scope as a rule.
Assign the result of controller() to a local variable.

```js
var thisCtrl;
...

beforeEach( module('MyModule'));

beforeEach( inject(function($controller, $timeout, $q, MyService1, MyService2){
controller = $controller;
...
}));

beforeEach(function(){
    thisCtrl = controller('MyController', {MyService: service});
})
afterEach( function(){
    thisCtrl = undefined;
});
```
## Component Controller

Like `ControllerAs` above, except that one must use `$componentController` to extract the controller.


```js
var componentName = "pcSomeComponent"

beforeEach( inject(function(_$componentController_){
    $componentController = _$componentController_;
}));
it('should be defined', function(){
    var ctrl = $componentController(componentName)

    expect(ctrl).toBeDefined();
});
```

## Dealing with DOM issues

One may come across controllers which may manipulate the DOM directly. In order to successfully unit test this one may have to insert a element for which the controller assumes is already present.

In the example below, the controller is setting the focus on an input tag. In the browser, the input is available. However, during unit testing the input tag may not yet be part of the DOM. See [Testing templates](./angularjs-testing-templates.md) for tips on appending content to DOM.

```js
vm.$onInit = init;

function init(){
    focusInput();
}

/**
 * Sets focus to search bar
 */
function focusInput(){
    $timeout(function(){
        // can throw an error if the first find fails
        input = $document.find('md-autocomplete').find('input');
        input.focus();
    }, 0);
}
```
As noted earlier, the `$onInit` function will not fire until the first `$digest`, thus one does not need to worry about the `focusInput()` being executed when the component's template is not ready.

The `$timeout` forces a digest cycle but in unit testing it will not execute it's payload until the clock is advanced with a `$timeout.flush(x)` where `x` is the number of millisecond which defaults to `0`. This provides breathing room for controller testing since it is not necessary to ever invoke `focusInput`. If one does invoke `focusInput()`, `.find` will return null and break all tests.

[Back to AngularJS Testing Home](./angularjs-testing-home.md)
