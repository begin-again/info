## Filesystem

```javascript
const fs = require('fs');
const fakeFS = require('mock-fs');
const lib = require('../builder/lib/build.lib');

it('should append line to end of log file', async function(){
    fakeFS({ './package.log':"" });
    // verify that fakeFS is working
    expect(fs.readFileSync('package.log', 'utf8')).to.equal('');
    const data = {
        path: '.'
        , projectsBuilt: [ 'name' ]
        , heads: [ 'hash' ]
        , name: 'name'
        , digest: 'digest'
        , user: 'user'
    };
    await lib.appendEntryToLog(data);

    expect(fs.readFileSync('./package.log', 'utf8')).to.contain('name digest user name=hash');
});
```

## Promises

```javascript
const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");

use(sinonChai);

it('sinon fake should resolve', async () =>{
    const fake = sinon.fake.resolves('resolved');

    const result = await fake();
    expect(result).to.equal('resolved');
});
```
