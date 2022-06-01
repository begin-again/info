# Developer Tools Tips

## Obtain handles for app objects

```javascript
var inject = angular.element(document.querySelector('*[ng-app]')).injector()
var polling = inject.get('PollingService')
```

### iframes

```js
document.querySelector("iframe").contentWindow.angular.element(document.querySelector("*[ng-app]")).injector()

// alt
var iframe = document.querySelector('iframe').contentWindow
var inject = iframe.angular.element(iframe.document.querySelector('*[ng-app]')).injector();
```
