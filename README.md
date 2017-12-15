<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/metamagicglobal/amexio/master/demo/src/assets/logo.svg">
</p>

# amexio - Angular library built with ❤ using ngx-library yeoman generator.

[![npm version](https://badge.fury.io/js/amexio.github.io.svg)](https://badge.fury.io/js/amexio),
[![Build Status](https://travis-ci.org/meta-magic/amexio.github.io.svg?branch=master)](https://travis-ci.org/meta-magic/amexio.github.io)
[![Coverage Status](https://coveralls.io/repos/github/meta-magic/amexio.github.io/badge.svg?branch=master)](https://coveralls.io/github/meta-magic/amexio.github.io?branch=master)
[![dependency Status](https://david-dm.org/metamagicglobal/amexiometa-magic/amexio.github.io/status.svg)](https://david-dm.org/meta-magic/amexio.github.io)
[![devDependency Status](https://david-dm.org/meta-magic/amexio.github.io/dev-status.svg?branch=master)](https://david-dm.org/meta-magic/amexio.github.io#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/meta-magic/amexio.github.io.svg)](https://greenkeeper.io/)

## Demo

View all the directives in action at https://metamagicglobal.github.io/amexio

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `amexio-ng-extensions` via:
```shell
npm install --save amexio-ng-extensions
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `amexio-ng-extensions`:
```js
map: {
  'amexio-ng-extensions': 'node_modules/amexio-ng-extensions/bundles/amexio-ng-extensions.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { LibModule } from 'amexio-ng-extensions';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` LibModule .forRoot()`):
```js
import { LibModule } from 'amexio-ng-extensions';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [LibModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` LibModule `:

```js
import { LibModule } from 'amexio-ng-extensions';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [LibModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2017 MetaMagic Global. Licensed under the MIT License (MIT)

