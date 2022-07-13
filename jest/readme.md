# Jest notes

To mock a module which requires other modules, one must first create a mock of the nested modules.

## Nested modules

Taken from [HugoDF](https://github.com/HugoDF/mock-spy-module-import/blob/master/examples/spy-internal-calls-cjs/lib.jest-test.js)

module under test
```js
const db = require('./db');
const keyPrefix = 'todos';
const makeKey = (key) => `${keyPrefix}:${key}`;
const lib = {
  // Could also define makeKey inline like so:
  // makeKey(key) { return `${keyPrefix}:${key}` },
  makeKey,
  getTodo(id) {
    return db.get(lib.makeKey(id));
  }
};
module.exports = lib
```

db module
```js
const data = {};

async function get(k) {
  return data[k];
}

async function set(k, v) {
  data[k] = v;
}

module.exports = {
  get,
  set
};
```

```js
jest.mock('./db', () => ({
  get: jest.fn()
}));

const lib = require('./lib');
const mockDb = require('./db');

const {getTodo} = lib;
// Using const means we can't re-assign
let {makeKey} = lib;

beforeEach(() => {
  jest.clearAllMocks();
});
test('CommonJS > Mocking destructured makeKey doesn’t work', async () => {
  const mockMakeKey = jest.fn(() => 'mock-key');
  makeKey = mockMakeKey;
  await getTodo(1);
  expect(makeKey).not.toHaveBeenCalled();
  expect(mockDb.get).not.toHaveBeenCalledWith('mock-key');
});

test('CommonJS > Mocking lib.makeKey works', async () => {
  const mockMakeKey = jest.fn(() => 'mock-key');
  lib.makeKey = mockMakeKey;
  await getTodo(1);
  expect(mockMakeKey).toHaveBeenCalledWith(1);
  expect(mockDb.get).toHaveBeenCalledWith('mock-key');
});

test('CommonJS > Spying lib.makeKey works', async () => {
  const makeKeySpy = jest
    .spyOn(lib, 'makeKey')
    .mockImplementationOnce(() => 'mock-key');
  await getTodo(1);
  expect(makeKeySpy).toHaveBeenCalled();
  expect(mockDb.get).toHaveBeenCalledWith('mock-key');
});
```
