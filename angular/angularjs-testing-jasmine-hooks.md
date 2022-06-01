__Jasmine Hooks__

The following test suite illustrates the execution order of the four types of jasmine hooks:

```javascript
// dump is shorthand for angular.mock.dump()
describe('hook fun', function(){
    beforeEach(function(){
        dump("  Outside beforeEach");
    });
    beforeAll(function(){
        dump("Outside beforeAll");
    });
    afterEach(function(){
        dump("  Outside afterEach");
    });
    afterAll(function(){
        dump("Outside afterAll");
    });
    it('should be cool', function(){
        dump("    Outside test");
        expect("cool").toEqual("cool");
    });
    describe('sample spec to test that karma is working', function(){
        beforeEach(function(){
            dump("    Inside beforeEach");
        });
        beforeAll(function(){
            dump("    Inside beforeAll");
        });
        afterEach(function(){
            dump("    Inside afterEach");
        });
        afterAll(function(){
            dump("    Inside afterAll");
        });
        it('should be true', function(){
            dump("      Inside test");
            expect(1===1).toBe(true);
        });
    });
});
```


[Back to AngularJS Testing Home](./angularjs-testing-home)
