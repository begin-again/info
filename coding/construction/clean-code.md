# Clean Code

Core content is from [udemy - writing-clean-code](https://www.udemy.com/course/writing-clean-code))


- [Structure and Formatting](#structure-and-formatting)
  - [comments](#comments)
  - [vertical formatting](#vertical-formatting)
  - [coding style](#coding-style)
  - [horizontal formatting](#horizontal-formatting)
- [Functions and Methods](#functions-and-methods)
  - [Minimize The Number Of Parameters](#minimize-the-number-of-parameters)
  - [Keep Functions Small](#keep-functions-small)
  - [Do one thing](#do-one-thing)
  - [Levels of abstraction](#levels-of-abstraction)
  - [Avoid unexpected side effects](#avoid-unexpected-side-effects)
  - [output parameters](#output-parameters)
- [control structures](#control-structures)
  - [guards](#guards)
  - [extractions](#extractions)
  - [factory functions](#factory-functions)
  - [default params](#default-params)
  - [avoid magic numbers & strings](#avoid-magic-numbers--strings)
  - [prefer positive checks](#prefer-positive-checks)
- [Errors](#errors)
- [DRY](#dry)
- [Objects](#objects)
- [Classes](#classes)
  - [cohesion](#cohesion)
  - [law of demeter](#law-of-demeter)
  - [SOLID](#solid)
    - [single responsibility](#single-responsibility)
    - [Open-Closed](#open-closed)
    - [Liskov Substitution](#liskov-substitution)
    - [Interface Segregation](#interface-segregation)
    - [Dependency Inversion](#dependency-inversion)



## Structure and Formatting



### comments

Mostly bad because they often display redundant information. Comments could be considered a code smell of badly named or formatted code.

- bad
  - commented out code
  - redundant
  - explaining something poorly named
  - dividers

- good
  - JSDoc style comments are useful (when not generating documentation) for describing parameters and outputs that are then interpreted by an IDE.
  - legal information
  - comments which cannot be replaced by good naming
    - regular expressions
    - environment specific
    - todo note

```js
// jsdoc comments
/**
* contrived example
* @param {number} id
* @returns {Promise<number>} id
*/
function dumb(id){
    return Promise.resolve(id)
}

dumb()
```
 ![image](https://user-images.githubusercontent.com/11179873/161063245-9731d561-5f89-481a-9a4b-d872a3a65cf4.png)


### vertical formatting

Code should be readable like an essay - top to bottom without too many "jumps".

- consider splitting files with multiple concepts into own files
- different concepts should be separated by spacing
- similar concepts should not be separated by spacing
- keep related content close


### coding style

Agree on a style guide and use it


### horizontal formatting


- lines of code should not require scrolling horizontally to read
- use consistent indentation
- break long statements into multiple shorter ones
- use clear but not unreadable long names


## Functions and Methods


### Minimize The Number Of Parameters

Keep it low


### Keep Functions Small

Because a smaller body means less code to read and understand. But in addition, it also forces you (ideally) to write highly readable code - for example by extracting other functions which use good naming.

```js
function login(email, password) {
    if (!email.includes('@') || password.length < 7) {
        throw new Error('Invalid input!');
    }
    const existingUser = database.find('users', 'email', '==', email);
    if (!existingUser) {
        throw new Error('Could not find a user for the provided email.');
    }
    if (existingUser.password === password) {
    // create a session
    } else {
        throw new Error('Invalid credentials!');
    }
}

```

focused functions which are easy to read, to understand and to maintain
```js
function login(email, password) {
    validateUserInput(email, password);
    const existingUser = findUserByEmail(email);
    existingUser.validatePassword(password)
}

```

### Do one thing


### Levels of abstraction

There high-level and low-level operations in programming - and then a huge bandwidth between these two extremes. You just should not mix them with higher level operations since that can cause confusion and make code harder to read

And you should try to write functions where all operations are on the same level of
abstraction which then in turn should be exactly one level below the function name (i.e.
the level ob abstraction implied by the function name)

```js
function connectToDatabase(uri){
    if(uri === ''){
        console.log('Invalid URI!') // low level operation
        // showError('Invalid URI!') implementation details are abstracted away
        return;
    }

    const db = new Database(uri);
    db.connect(); // high level operation
}
```


### Avoid unexpected side effects

A side effect is simply an operation which changes the state (data, system status etc.) of
the application. Problems arise when a side effect is unexpected.


```js
function validateUserInput(email, password) {
    if (!isEmail(email) || passwordIsInvalid(password)) {
        throw new Error('Invalid input!');
    }
    createSession(); // unexpected side effect
}
```


### output parameters

Prefer to return a new object rather than modify an existing one unless the function is obvious as that is what it does.

```js
function createId(someUSer){
    someUser.id = 'u1'
}

const user = {name: 'max'};
// the function appears to be returning an ID not appending
const id = createId(user)

// instead it manipulates the input
console.log(user)

// an ok name would be "addId"
// or use an object which as an addId() method, user.addId()
```


## control structures

keep controls structures clean
- Avoid deep nesting
  - Factory functions
  - Polymorphism
- Prefer positive checks
- Utilize Errors


### guards

- fail fast
- use `return` or `throw` to break out of function
- use `continue` to break out of a loop iteration

```js
if(email.includes('@')) {
    // do stuff
}
```

Invert the check and return
```js
// this negative phrasing is a code smell that it could be extracted into a function where one could then
// use positive phrasing
if(!email.includes('@')){
    return; // fail fast
}
```

### extractions

- naming should indicate positive phrasing
- make level of abstraction consistent

```js
function connectDatabase(uri) {
    if (!uri) {
        throw new Error('An URI is required!');
    }
    const db = new Database(uri);
    let success = db.connect();
    if (!success) {
        if (db.fallbackConnection) {
            return db.fallbackConnectionDetails;
        } else {
            throw new Error('Could not connect!');
        }
    }
    return db.connectionDetails;
}

```

Could be improved to

```js
function connectDatabase(uri) {
    validateUri(uri);
    const db = new Database(uri);
    let success = db.connect();
    let connectionDetails;
    if (success) {
        connectionDetails = db.connectionDetails;
    else {
        connectionDetails = connectFallbackDatabase(db);
    }
    return connectionDetails;
}

function validateUri(uri) {
    if (!uri) {
        throw new Error('An URI is required!');
    }
}

function connectFallbackDatabase(db) {
    if (db.fallbackConnection) {
        return db.fallbackConnectionDetails;
    } else {
        throw new Error('Could not connect)
    }
}
```


### factory functions


```js
function usesTransactionMethod(t, type)
function processCreditCardPayment(t){}
function processPayPalPayment(t){}
function processPlanPayment(t){}

function getTransactionProcessor(transaction){
    let processor =  null;
    if( usesTransactionMethod(transaction, 'CC') ){
        processor = processCreditCardPayment
    } else if( usesTransactionMethod(transaction, 'PAYPAL') ) {
        processor = processPayPalPayment
    } else if( usesTransactionMethod(transaction, 'PLAN') ) {
        processor = processPlanPayment
    }
    return processor
}

getTransactionProcessor(transaction)()

```

- [Kyle Shevlin](https://kyleshevlin.com/what-is-a-factory-function)
- [javascript.plainenglish.io](https://javascript.plainenglish.io/factory-functions-in-javascript-explained-with-examples-8b93e98de117)


### default params

when it is possible to call a function without all parameters, it is helpful to apply a default to its not necessary to check for it.


### avoid magic numbers & strings

Instead of passing round strings and numbers use well-named ENUMN or constants. This helps to avoid typos and can improve readability and maintainability.


### prefer positive checks


```js
if (isEmpty(blogContent)) {
    // throw error
}
if (!hasContent(blogContent)) {
    // throw error
}

```
The first snippet is quite readable and requires zero thinking. The second snippet uses the ! operator to check for the opposite - slightly more thinking
and interpretation is required from the reader.


## Errors

Embrace the built-in Errors and Error Handling. Don't just log it.

```js
// bad
if(!isEmail){
    return {code: 455, message: 'Invalid input'}
}

// better
if(!isEmail){
    const error = new Error('Invalid input')
    error.code = 455
    throw error
}

// best would be to subclass Error to create one's own Errors
```

Use try/catch blocks when working with code that could throw errors.


## DRY

don't repeat yourself


## Objects

objects allow you to group related data (properties) and functionalities
(methods) together.

## Classes

Classes are blueprints for objects. Classses should be small. The size of a class is defined by its number of responsibilities. And clean
classes should only have one responsibility


### cohesion

high is where many of the methods utilize the class's own properties.


### law of demeter

principle of least knowledge: Do not depend on the internals of "strangers" (other objects which you don't directly know)

code in a method may only access the direct internal (properties and methods) of:
- the object it belongs to
- objects that are stored in properties of the object
- objects which are received as method parameters
- objects which are created in the method


```ts
// bad

class Customer {
  lastPurchase: any;
}

class DeliveryJob {
    customer: any
    warehouse: any

    constructor(customer, warehouse){
        this.customer = customer
        this.warehouse = warehouse
    }

    deliveryLastPurchase(){
        // we should not know about customer's lastPurchase.date
        const date = this.customer.lastPurchase.date;
        this.warehouse.deliverPurchaseByDate
    }
}

```

```ts
// good
class Customer {
  lastPurchase: any;

  getLastPurchaseDate() {
    return this.lastPurchase.date;
  }
}

class DeliveryJob {
  customer: any;
  warehouse: any;

  constructor(customer, warehouse) {
    this.customer = customer;
    this.warehouse = warehouse;
  }

  deliverLastPurchase() {
    // const date = this.customer.lastPurchase.date; --> poor
    // const date = this.customer.getLastPurchaseDate();  --> still wrong (tell don't ask)
    // this.warehouse.deliverPurchasesByDate(this.customer, date);
    this.warehouse.deliverPurchase(this.customer.lastPurchase);
  }
}
```

__Additional Sources__<br>
- [wikipedia](https://en.wikipedia.org/wiki/Law_of_Demeter)


### SOLID


|       | Principle name                                  | connection to clean code?                                                                             |
| :---: | :---------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
|   S   | [Single responsibility](#single-responsibility) | small and focused are easier to read                                                                  |
|   O   | [Open-Closed](#open-closed)                     | extensibility ensures small class instead of growing classes<br> helps prevent code duplication (DRY) |
|   L   | [Liskov Substitution](#liskov-substitution)     |                                                                                                       |
|   I   | [Interface Segregation](#interface-segregation) | extensible                                                                                            |
|   D   | [Dependency Inversion](#dependency-inversion)   | makes code small and easier to read. Maintainability                                                  |


__Additional Sources__<br>
- [SOLID Posters](./solid-demotivator-posters.md)


#### single responsibility

Classes should have a single responsibility - a class shouldn't change for more than one reason.
- related to business responsibilities
- does not mean one method
- small and focused are easier to read


```ts
// NOT violating SRP
class User {
  login(email: string, password: string) {}

  signup(email: string, password: string) {}

  assignRole(role: any) {}
}

// Violating SRP
class ReportDocument {
    // pulling, connecting, analyzing data
    generateReport(data: any) {}

    // this is more about presentational logic
    createPDF(report: any) {}
}

```


#### Open-Closed

A class should be open for extension but closed for modification


```ts
// problem here is that it needs to grow when ever we add new functionality, like printing different type of documents
// we need to add new methods and on verifyData we'd need to modify it for each new document type
class Printer {
  printPDF(data: any) {
    // ...
  }

  printWebDocument(data: any) {
    // ...
  }

  printPage(data: any) {
    // ...
  }

  verifyData(data: any) {
    // ...
  }
}
```


```ts
// better

// all implementing classes will implement the print as defined here
interface Printer {
  print(data: any);
}

// all extending classes need their own verifyData
class PrinterImplementation {
  verifyData(data: any) {}
}

// adding new document types is achieved by adding a new class
class WebPrinter extends PrinterImplementation implements Printer {
  print(data: any) {
    // print web document
  }
}

class PDFPrinter extends PrinterImplementation implements Printer {
  print(data: any) {
    // print PDF document
  }
}

class PagePrinter extends PrinterImplementation implements Printer {
  print(data: any) {
    // print real page
  }
}
```

__Additional Sources__<br>
- [reflectoring.io](https://reflectoring.io/open-closed-principle-explained/)
- [wikipedia](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)
- [brains-to-bytes](https://www.brainstobytes.com/the-open-closed-principle/)


#### Liskov Substitution

Objects should be replaceable with instances of their subclasses without altering behavior. Wants to ensure that we do not model data in the wrong way.


```js
// problem
class Bird {
    fly() {
    console.log('Fyling...');
  }
}

class Eagle extends bird {
  dive() {
    console.log('Diving...');
  }
}

const eagle = new Eagle();
eagle.fly();
eagle.dive();

class Penguin extends Bird {
  // Problem: Can't fly!
}
```

```js
// better
class Bird {}

class FlyingBird extends Bird {
  fly() {
    console.log('Flying...');
  }
}

class Eagle extends FlyingBird {
  dive() {
    console.log('Diving...');
  }
}

const eagle = new Eagle();
eagle.fly();
eagle.dive();

class Penguin extends Bird {
  swim(){
      console.log('Swimming...')
  }
}
```

__Additional Sources__<br>
- [reflectoring.io](https://reflectoring.io/lsp-explained/)
- [Stackify](https://stackify.com/solid-design-liskov-substitution-principle/)
- [wikipedia](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
- [stack overflow](https://stackoverflow.com/questions/56860/what-is-an-example-of-the-liskov-substitution-principle)


#### Interface Segregation

Many client-specific interfaces are better than one general purpose interface


```ts
// bad

// is trying to cover too many use cases
interface Database {
    connect(uri: string);
    storeData(data: any);
}

class SQLDatabase implements Database {
  connect(uri: string) {
    // connecting...
  }

  storeData(data: any) {
    // Storing data...
  }
}

class inMemoryDatabase implements Database {
    connect(uri:string){
        // ?
    }
    storeData(data:any){
        // Storing data
    }
}

```


```ts
// good
interface Database {
  storeData(data: any);
}

interface RemoteDatabase {
  connect(uri: string);
}

class SQLDatabase implements Database, RemoteDatabase {
  connect(uri: string) {
    // connecting...
  }

  storeData(data: any) {
    // Storing data...
  }
}

class InMemoryDatabase implements Database {
  storeData(data: any) {
    // Storing data...
  }
}

```

__Additional Sources__<br>
- [reflectoring.io](https://reflectoring.io/interface-segregation-principle/)
- [wikipedia](https://en.wikipedia.org/wiki/Interface_segregation_principle)


#### Dependency Inversion

Should depend on abstractions, not concretions.



```ts
// bad
interface Database {
  storeData(data: any);
}

interface RemoteDatabase {
  connect(uri: string);
}

class SQLDatabase implements Database, RemoteDatabase {
  connect(uri: string) {
    console.log('Connecting to SQL database!');
  }

  storeData(data: any) {
    console.log('Storing data...');
  }
}

class InMemoryDatabase implements Database {
  storeData(data: any) {
    console.log('Storing data...');
  }
}

class App {
  private database: SQLDatabase | InMemoryDatabase;

  constructor(database: SQLDatabase | InMemoryDatabase) {
      if(database instanceof SQLDatabase){
          database.connect('my-url')
      }
    this.database = database;
  }

  saveSettings() {
    this.database.storeData('Some data');
  }
}


const sqlDatabase = new SQLDatabase();
sqlDatabase.connect('my-url');
const app = new App(sqlDatabase);
```


```ts
// good
interface Database {
  storeData(data: any);
}

interface RemoteDatabase {
  connect(uri: string);
}

class SQLDatabase implements Database, RemoteDatabase {
  connect(uri: string) {
    console.log('Connecting to SQL database!');
  }

  storeData(data: any) {
    console.log('Storing data...');
  }
}

class InMemoryDatabase implements Database {
  storeData(data: any) {
    console.log('Storing data...');
  }
}

// we no longer care about the data here in the App class
// force anyone instantiating the class to provide a database which implements a storeData method
class App {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  saveSettings() {
    this.database.storeData('Some data');
  }
}


const sqlDatabase = new SQLDatabase();
sqlDatabase.connect('my-url');
const app = new App(sqlDatabase);
```

__Additional Sources__<br>
- [wikipedia](https://en.wikipedia.org/wiki/Dependency_inversion_principle)
- [stefano santilli](https://www.linkedin.com/pulse/dependency-inversion-principle-stefano-santilli)
