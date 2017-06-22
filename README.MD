# Amexio Angular Extensions [![npm version](https://badge.fury.io/js/amexio-ng-extensions.svg)](https://badge.fury.io/js/amexio-ng-extensions.svg) [![TeamCity CodeBetter](https://img.shields.io/teamcity/codebetter/bt428.svg)]() [![npm](https://img.shields.io/npm/dt/amexio-ng-extensions.svg)]()
<br/>

[![NPM](https://nodei.co/npm/amexio-ng-extensions.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/amexio-ng-extensions/)


## Browsers support

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| Edge| last 5 versions| last 5 versions| last 2 versions


## Installation

To install this library, run:

```bash
$ npm install amexio-ng-extensions --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install amexio-ng-extensions
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { AmexioWidgetModule } from 'amexio-ng-extensions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AmexioWidgetModule,
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<amexio-text-input></amexio-text-input>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

Apache 2.0 © [MetaMagic Global](http://www.amexio.org/metamagic-showcase/license.html)
