__Mocking__

* [Examples](#examples)
  * [$mdSidenav](#mdsidenav)
  * [$mdDialog](#mddialog)

## Examples

### $mdSidenav

We can use the [$provide service](https://code.angularjs.org/1.7.9/docs/api/auto/service/$provide) to replace the real `$mdSidenav` with a jasmine spy.

```js
// controller
/ Define controller
function MyConroller( $mdSidenav) {
    var vm = this;

    function toggleMenu() {
        $mdSidenav('left-nav').toggle();
    }
}
```

```js
var sideNavToggleMock = {};

// assumes 'our-module' includes a dependency on `ngMaterial`
beforeEach(module('our-module'))
// must occur prior to injector
beforeEach(module(function($provide) {
    // $mdSidenav mocks
    sideNavMock.toggle = jasmine.createSpy('toggle');
    sideNavMock.isOpen = jasmine.createSpy('isOpen');
    sideNavMock.close = jasmine.createSpy('close');
    function mocks() {
        return function(str) {
            var mocks = {
                toggle: sideNavMock.toggle.bind(null, str)
                , isOpen: sideNavMock.isOpen.bind(null, str)
                , close: sideNavMock.close.bind(null, str)
            };
            return mocks;
        };
    }
    // provider service will replace the real $mdSidenav with our mock
    // which the controller will utilize when it is injected
    $provide.factory('$mdSidenav', mocks);
}));

// notice that $mdSidenav is not being injected here
// the tests reference the mock variable
// if they wanted to reference the $mdSidenav instead it would need to be injected
beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
}));

beforeEach(function() {
    ctrl = $componentController(componentName);
});

describe('toggleMenu()', function(){
    it('should toggle state of left-nav', function(){
        ctrl.toggleMenu();

        expect(sideNavToggleMock).toHaveBeenCalledWith('left-nav');
    });
});
```

### $mdDialog

Again we use the provider service. Because we have named the provide same as that injected by our


__Controller__
```js
function MyController($mdDialog){
var vm = this;
vm.announcements = [];
vm.showDialog = showDialog;

function showDialog(index) {
    $mdDialog.show({
        locals: { announcements: vm.announcements, index: index }
        , controller: DialogController
        , clickOutsideToClose: true
    });
}
```

__Spec__
```js
var $mdDialog;
var mshow, mhide, mcancel;

// set up $mdDialog mocks
beforeEach(module(function($provide){
    mshow = jasmine.createSpy('show');
    mhide = jasmine.createSpy('hide');
    mcancel = jasmine.createSpy('cancel');
    $provide.factory('$mdDialog', function() {
        return {
            hide: mhide
            , cancel: mcancel
            , show: mshow
        };
    });
}));

// here we are injecting our mock provider
beforeEach(inject(function(
    _$componentController_,
    _connectHttpService_,
    _$rootScope_,
    _UnitTestHelper_,
    _$mdDialog_
) {
    $componentController = _$componentController_;
    connectHttpService = _connectHttpService_;
    $rootScope = _$rootScope_;
    UnitTestHelper = _UnitTestHelper_;
    $mdDialog = _$mdDialog_;
}));

beforeEach(function() {
    ctrl = $componentController(componentName);
});

describe('showDialog()', function() {
    it('should show dialog', function() {
        var calledWith;
        ctrl.announcements = 1;

        ctrl.showDialog(1);

        // tests can reference the $mdDialog which is really our mock
        calledWith = $mdDialog.show.calls.argsFor(0)[0];

        expect(calledWith.locals.index).toBe(1);
        expect(calledWith.locals.announcements).toBe(1);
        expect(calledWith.clickOutsideToClose).toBe(true);
    });
});

```

[Back to AngularJS Testing Home](./angularjs-testing-home)
