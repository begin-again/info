__Testing Templates__

* [Configure](#configure)
* [Components](#components)
* [Triggering Event Handlers](#triggering-event-handlers)
* [Dealing with controllers which expect template to be in DOM](#dealing-with-controllers-which-expect-template-to-be-in-dom)


## Configure

Karma has been configured to utilize [ngHtml2JsPreprocessor](https://github.com/karma-runner/karma-ng-html2js-preprocessor) to load template files into angular's template cache referenced by a module normally named _AppTemplates_


## Components

1.  Setup the environment (karma)
1.  Load the module containing the component. `beforeEach( module('<module name>'))`
1.  Load and support modules not already referenced in the component module.
1.  Load the module containing the templates. `beforeEach( module('AppTemplates'))`
1.  Inject needed services. Will definitely need `$rootScope` and `$compile` so start with those.
    ```js
    var $compile, $rootScope;
    beforeEach( inject(function(_$compile_, _$rootScope_){
            $compile = _$compile_;
            $rootScope = _$rootScope_;
    }));
    ```
1.  Compile the template.
    ```js
    var directiveScope;
    var template = "<pc-cool></pc-cool>";
    var $scope = $rootScope.$new();
    var directive = $compile(angular.element(template))($scope);
    // at this point the template has not been bound to its controller
    // and will appear as <pc-cool></pc-cool>
    $scope.$digest()
    // Now the template has been fleshed out and it's controller's $onInit function
    // has been executed, if applicable.

    // If the component's controller employs controllerAs syntax as it should
    // the isolatedScope() function will provide a handle to the component's scope including controller public methods & properties.
    directiveScope = directive.isolateScope()
    ```


## Triggering Event Handlers

Verify that a template's event handlers work as intended.

```html
<md-list-item
    class="mm-app-list"
    ng-repeat="app in value | orderBy: 'APP_TITLE'"
    ng-click="vm.openApp(app.APPLICATION_ID, app.APP_TITLE)"
    aria-label="Open {{app.APP_TITLE}}">
</md-list-item>
```

```js
it('should attempt to open app on click', function(){
    // Set up
    someService.apps = [{APPLICATION_ID: 1, APP_TITLE: 'Fake Title'}];
    $scope = $rootScope.$new();

    // compile the directive
    directive = $compile(angular.element(template))($scope);

    // Fire the $onInit and populate binds
    $scope.$digest();

    // Obtain a handle to the controller
    dirScope = directive.isolateScope();
    // spyOn a controller method
    spyOn(dirScope.vm, "openApp");

    // locate the element with the event handler
    result = directive.find('md-list-item button')[0];
    // trigger the event
    angular.element(result).triggerHandler("click");

    // verify that the spy fired and received the expected input
    expect(dirScope.vm.openApp).toHaveBeenCalledWith(1, 'ZZZ 1' );
});
```


## Dealing with controllers which expect template to be in DOM

Sometimes a controller will manipulate the DOM outside of the template which should be avoided because it complicates testing.  [See Controllers - DOM issues](controllers.md#deailing-with-dom-issues)

Below is a controller which is setting focus on a DOM element. It works fine in the browser, so long as the template has been rendered.

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

When testing the template though, once a `$digest` is fired the `focusInput()` function will be called. The `$timeout` prevents this from being a total catastrophe because angular will not execute it's payload until one explicitly advances the test clock with `$timeout.flush()` despite the timeout being set to `0`. This is a feature of angular-mocks and why one should strive to utilize angular services/directives over standard JS.

However, to actually test that the focus has been applied, one will have to append the template to the DOM prior to the first `$digest()`

```js
var element, $compile, $scope, searchBarDirective, template = "<pc-search-bar></pc-search-bar>"

// injections not shown

beforeEach(function(){
    // create an element which literally looks like w{0: <pc-search-bar></pc-search-bar>, length: 1}
    element = angular.element(template);
    // expose the real DOM and append our element. Notice the brackets on element
    $document[0].body.appendChild(element[0]);
    $scope = $rootScope.$new();
});
afterEach(function(){
    // clean up by removing the element
    element[0].remove();
});

```

[$document](https://code.angularjs.org/1.6.9/docs/api/ng/service/$document) is a wrapper over the standard `window.document`. When referenced as `$document()` one only has the [functions](https://code.angularjs.org/1.6.9/docs/api/ng/function/angular.element) available through angular. To obtain the actual DOM, one must reference it as `$document[0]`.

> If jQuery is available, angular.element is an alias for the jQuery function. If jQuery is not available, angular.element delegates to AngularJS's built-in subset of jQuery, called "jQuery lite" or jqLite.
```js
describe('Input', function(){
    it('should not be focused', function(){
        searchBarDirective = $compile(element)($scope);
        // w{0: <pc-search-bar class="ng-scope"></pc-search-bar>, length: 1}

        $scope.$digest();
        // w{0: <pc-search-bar class="ng-scope ng-isolate-scope"><md-content class="pp-search-bar _md"> ... </pc-search-bar>, length: 1}

        result = searchBarDirective.find(':focus');
        // because jQuery is loaded can search by the pseudo selector
        // result is an object containing properties of length, prevObject, and 0 which is any matches of which there will be none
        // because $timeout has not been flushed
        expect(result[0]).not.toBeDefined();
    });
    it('should be focused', function(){
        searchBarDirective = $compile(element)($scope);

        $scope.$digest();
        // the focusInput function's timeout does not fire until the flush
        $timeout.flush();

        result = searchBarDirective.find(':focus');
        // now result should include a match
        expect(result[0]).toBeDefined();
        // and because result is an angular.element one can utilize the attr method
        expect(result.attr('type')).toBe('search');
    });
});
```

[Back to AngularJS Testing Home](./angularjs-testing-home)
