__Mocks, Stubs, Spies__

- [tools](#tools)
- [Log spying](#log-spying)
- [Faking it](#faking-it)
  - [straight forward](#straight-forward)
  - [more complex](#more-complex)
- [Mock files](#mock-files)

## tools

- [proxyquire](https://github.com/thlorenz/proxyquire)
  - Intercepts calls to _require_ so that one can replace all or portions of modules
- [mock-fs](https://github.com/tschaub/mock-fs)
  - Intercepts calls to the NodeJS fs modules so that one can specify a completely artificial file system
  - Must not be invoked prior to proxyquire
- [sinon](https://sinonjs.org/releases/v8.1.1/)
  - Allows creation of [spies](https://sinonjs.org/releases/v8.1.1/spies/), [fakes](https://sinonjs.org/releases/v8.1.1/fakes/), [stubs](https://sinonjs.org/releases/v8.1.1/stubs/)


## Log spying

```js
const pexec = require('util').promisify(require('child_process').exec);
const logger = require('./logger');

const releaseCommit = (modes, path, priorMessage, title = '') => {
    const _title = title || `RELEASE: ${modes.join(' ').trim()}`;
    let cmd = `git -C ${path} add release && git -C ${path} commit --no-verify -qm "${_title}"`;
    logger.debug(`Release commit title: ${_title}`);
    cmd += attachLines(priorMessage, _title);
    return pexec(cmd)
        .then(() => Promise.resolve())
        .catch(({ code, stdout }) => {
            logger.error(`${code}: ${stdout}`);
            return Promise.reject('Failed to commit release');
        });
};
```

```js
it('should log error', async () => {
    const modes = [ `prod`, `test` ];
    const path = gtools.createRepo('release');
    const priorMessage = `HELLO`;
    const debugSpy = sinon.spy();
    const errorSpy = sinon.spy();
    const stubs = {
        './logger': { debug: debugSpy, error: errorSpy }
    };
    const { releaseCommit } = proxyquire(libPath, stubs);

    const result = await releaseCommit(modes, path, priorMessage)
        .catch(err => err);

    expect(result).equals('Failed to commit release');
    expect(debugSpy).calledWith('Release commit title: RELEASE: prod test');
    expect(errorSpy).callCount(1);
});
```

## Faking it

Use proxyquire to replace module methods with sinon fakes.


### straight forward

The snippet below requires the semver library which we do not want to test. We use proxyquire to replace semver with our own sinon fakes.

```js
const semver = require('semver');
const defaultVersion = '^8.11.1';
const detectedVersion = semver.clean(process.version);

const engineCheck = (requiredVersionRange = null, log = null, addMsg = '') => {

    const _requiredVersion = requiredVersionRange || defaultVersion;
    if(!semver.satisfies(detectedVersion, _requiredVersion)) {
        const msg = `${addMsg ? `( ${addMsg} ) ` : ''}detected version ${detectedVersion} but required ${_requiredVersion}`;
        if(log) {
            log(msg);
        }
        process.exitCode = 1;
        throw new Error(`Incompatible NodeJS version: ${msg}`);
    }
};

module.exports = engineCheck;
```

```js
const proxyquire = require('proxyquire').noCallThru();

describe('Engine Module', () => {
    let logSpy;
    beforeEach(() => {
        logSpy = sinon.spy();
    });
    it('should not throw when compatible', () => {
        const satisfyFake = sinon.fake.returns(true);
        const cleanFake = sinon.fake.returns('6.5.1');
        const engineCheck = proxyquire('./engine', {
            'semver': { satisfies: satisfyFake, clean: cleanFake }
        });

        engineCheck('^6.5.0', null);
        // always verify that fakes and spies have been called or not.
        expect(logSpy).not.called;
        expect(cleanFake).calledOnce;
        expect(satisfyFake).calledOnce;
    });
});
```

### more complex

The built-in `util` module provides a method to convert a standard asynchronous function to a promise. In the example below,  `child_process.exec` is wrapped in a promise by `util.promisify` but we want to prevent having the exec function from actually running and instead provide our own responses.

```js
const exec = require('util').promisify(require('child_process').exec);
const { join } = require('path');
const GHE = 'https://github.com/ORG';
const defaults = {
    log: null
    , remote: GHE
    , branch: 'master'
};

const clone = (cmd, name, destPath, { log }) => {
    if(log) {
        log.debug(`clone: ${name} => ${cmd}`);
    }
    return exec(cmd, { cwd: destPath, encoding: 'utf-8' })
        .then(
            () => ({ repo: name, path: join(destPath, name) }),
            err => ({ repo: name, err: err })
        );
};

const cloneAll = (names, destPath, options) => {
    const _options = { ...defaults, ...options };
    return Promise.all(
        names.map(name => {
            const cmd = formatCommand(name, _options);
            return clone(cmd, name, destPath, _options);
        })
    );
};

const formatCommand = (name, { remote, branch }) =>
    `git clone -q -c core.longpaths=true --depth 1 --branch ${branch} ${remote}/${name}`;

module.exports = {
    cloneAll
};

```

What we want to do is create a fake for `util.promisify` such that it returns a fake for exec that then returns a promise.

```js
// noCallThru prevents functions from being pulled thus we must create our own
const proxyquire = require('proxyquire').noCallThru();

describe('Cloning Utility', () => {
    let debugSpy; let execStub; let promisifyStub; let stubs;
    beforeEach(() => {
        debugSpy = sinon.spy();
        execStub = sinon.stub();
        promisifyStub = sinon.stub().returns(execStub);
        stubs = {
            'util': { promisify: promisifyStub }
        };
    });
    it('should call git clone', async () => {
        execStub.resolves();
        const { cloneAll } = proxyquire('./clones', stubs);
        const repos = [ 'fake' ];

        const result = await cloneAll(repos, 'fakePath', { branch: 'branch1', log:{ debug: debugSpy }, remote: 'fakeRemote' });

        expect(debugSpy.firstCall.firstArg).to.match(/branch1/);
        expect(debugSpy.firstCall.firstArg).to.match(/fakeRemote\/fake/);
        expect(result).to.be.an('array');
        expect(result[0].repo).to.equal('fake');
        expect(result[0].err).to.be.undefined;
    });
});
```

## Mock files

Reading or writing to the file system should be avoided because it is slow and unpredictable. The mock-fs module allows one to trick the NodeJS fs module into reading an object rather than the file system.

When using with `require` or `proxyquire`, do not invoke mock-fs before the require.

```js
const mockFS = require('mock-fs');

it('should return parsed JSON on success', () => {
    mockFS({ repo: { 'package.json': JSON.stringify({ name: 'hello' }) } });

    const { name, error } = getPackage(join('repo', 'package.json'));

    expect(name).equals('hello');
    expect(error).to.be.undefined;

    // ensure to restore the fs module between tests
    mockFS.restore();
});
```

[Back to Node Testing Home](./node-testing-home.md)
