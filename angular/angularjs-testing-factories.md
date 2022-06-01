__Testing Factories__

Only test public functions

Monitor code coverage to ensure that tests are covering all possible results

1.  Load the module (`beforeEach`)
    -   the module must have already been created (`angular.module('MyModule', [])`)
1.  Inject dependencies (`beforeEach`)
    -   The service
    -   `$httpBackend` : fake server
    -   `$rootScope` : used for `$digest()`
1.  Test functions which call a server
    -   Setup a fake server with $httpBackend
        -   `expectGET(/regular expression of request string/)`
        -   respond(status code, stuff to return as data)
    -   mock any other functions to isolate function under test
        -   `SpyOn(service, 'function')`
    -   Setup call to the service
        -   the service function
        -   the then/catch
            -   response = data
    -   Flush out server requests
        -   `expect($httpBackend.flush).not.toThrow()`;
    -   Ensure that mock functions were called as necessary
        -   `expect(service.function).toHaveBeenCalled()`
    -   Test that the response is expected
        -   `expect( response ).toEqual(something)`
    -   Ensure that all expectations have cleared
        -   `$httpBackend.verifyNoOutstandingExpectations()`
1.  Test functions which do not contact a server
    -   Mock any other functions to isolate function under test
        -   `SpyOn(service, 'function')`
    -   Setup call to service
        -   service.myFunction
    -   If there are any promises, use `$rootScope` to initiate a `$digest`
    -   Ensure that mock functions were called as necessary
        -   `expect(service.function).toHaveBeenCalled()`
    -   Test the result
        -   `expect( result ).toEqual(something)`

    ```js
    describe('my service', function(){
      var env = {}
      var service;
      var httpBackend;
      var scope;  // if needed for digest
      var response;

      beforeEach( module('MyModule'));
      beforeEach( inject(function(MyService, $httpBackend, $rootScope){
        service = MyService;
        httpBackend = $httpBackend;
        scope = $rootScope.$new();
        env.generateUrl = jasmine.createSpy('genUrl').and.returnValue('myfunction url')
      }));
      afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        response = undefined;
      });
      describe('my function', function(){
        it('should trap http error', function(){
          httpBackend
            .expectGET(/myfunction/)
            .respond(500);

          MyService
            .getStuff()
            .catch(function(err){
              response = err
            });

          expect(env.generateUrl).toHaveBeenCalled();
          expect(response).toEqual('some error message');
        });
        it('should trap server error')
        it('should return array on success')
      });
    });
    ```

[Back to AngularJS Testing Home](./angularjs-testing-home)
