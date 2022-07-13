# JSDOC Comments

2022-02-21


- [elements](#elements)
- [examples](#examples)
  - [@param](#param)
  - [@fires](#fires)
  - [@property](#property)
  - [@type](#type)
  - [@typedef](#typedef)
  - [@returns](#returns)
- [vscode config](#vscode-config)
- [Resources](#resources)


There are three things we can do to improve our code:

1. automated testing (best)
1. good comments (best)
1. typing (good)


This meeting is to address the latter 2.


VS Code works wonderfully with Typescript but that is a lot to learn. Instead we can utilize a subset of JSDOC which is supported by typescript.


## elements


@fires - associate an event message
@param - arguments into a function
@property - parts of a typedef or public properties of a class
@returns - used when a function returns something other than void
@type -  used when an internal variable is not obvious how it is being used
@typedef - use when a variable type is used often

The _typings_ folder is recognized by vscode as the home of type definitions. It is likely noted in a `.gitignore` file where it should be removed.


## examples



### @param

```js
class Settings extends ChildWindow {
    /**
     * @param {BrowserWindow} parentWindow - some window
     */
    constructor(parentWindow) {
        super(parentWindow);
    }
```


### @fires


```js
/**
 *
 * @param {object} cfg
 * @fires broadcast
 * @returns {void}
 */
const superBroadcast = (cfg) => ipcRenderer.send('broadcast', cfg);
```


### @property


In type definitions and often seen in a [Class](https://cs.github.com/pardeike/Harmony/blob/a6c2203a8b4341b8e3a74e6580f67ed08afdbcd9/docs/styles/lunr.js#L2304)


### @type

Typically use for in-line one-offs where the type is not obvious

```js
/** @type {boolean} */
this.failover = settings.get('failover');
```


### @typedef


```js
/**
 * @typedef {object} HostType
 * @property {string} host
 * @property {number} timestamp
 * @property {Boolean} public
 * @property {number=} id
 */

 /**
 * @typedef {object} UserConfigType
 * @property {HostType[]} hosts
 * @property {string} updateHost
 * @property {boolean} failover
 * @property {boolean} allowDevTools
 * @property {boolean} allowSettings
 * @property {boolean} allowDocs
 * @property {string} versionThreshold
 * @property {string=} extension
 */
```


### @returns


```js
/**
 * Creates main Vue application instance
 *
 * @param {(webApp: object, hostConfig: HostType|object)} cb
 * @returns {Function} - callback
 * @fires currentHost
 */
const createApp = (cb) => {
    /** @type {HostType|object} */
    hostConfig = ipcRenderer.sendSync('currentHost', {});
    webAppConfig.url = hostConfig.url;
    webApp = new Vue(webAppConfig);
    console.log('createApp', webApp);
    return cb(webApp, hostConfig);
};

```


## vscode config

Minimum

1. Create a jsconfig.json file in repository root
    ```json
    {
        "compilerOptions": {
            "module": "commonjs",
            "target": "es6"
        }
    }
    ```
1. Create a _typings_ folder in repository root.
   - include an empty _.gitkeep_



## Resources

- https://jsdoc.app/
- https://www.valentinog.com/blog/jsdoc/
- https://dev.to/ingosteinke/using-jsdoc-to-write-better-javascript-code-17a
- https://dev.to/shhdharmen/how-to-utilise-jsdoc-comment-tags-so-that-visual-studio-code-intellisense-works-great-3ho4
- https://dev.to/sumansarkar/how-to-use-jsdoc-annotations-with-vscode-for-intellisense-7co
- https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html
- https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html
