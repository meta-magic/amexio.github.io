# Amexio Angular Extensions [![npm version](https://badge.fury.io/js/amexio-ng-extensions.svg)](https://badge.fury.io/js/amexio-ng-extensions.svg) [![TeamCity CodeBetter](https://img.shields.io/teamcity/codebetter/bt428.svg)]() [![npm](https://img.shields.io/npm/dt/amexio-ng-extensions.svg)]()
<br/>

[![NPM](https://nodei.co/npm/amexio-ng-extensions.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/amexio-ng-extensions/)

## Browsers support <sub><sup><sub><sub>made by <a href="https://godban.github.io">godban</a></sub></sub></sup></sub>

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/opera.png" alt="Opera" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari-ios.png" alt="iOS Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome-android.png" alt="Chrome for Android" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome for Android |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| Edge| last 5 versions| last 5 versions| last 3 versions| last 4 versions| last 3 versions| last 3 versions

## Amexio ❤ Bootstrap

We now have support for both the Bootstrap 3.3.7 & Bootstrap 4.0.0 alpha 6

For Documentation Related to both version's use below link

### [Amexio Bootstrap 3](http://www.amexio.org/showcaseapp/v1/index.html)
### [Amexio Bootstrap 4](http://www.amexio.org/showcaseapp/v2/index.html)

## Angular CLI - Installation

### Overview

The Angular CLI is a tool to initialize, develop, scaffold and maintain Angular applications

### Getting Started

To install the Angular CLI:

```bash
npm install -g @angular/cli
```
Generating and serving an Angular project via a development server Create and run a new project:

```bash
ng new my-project
cd my-project
ng serve
```

Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

For More on Angular CLI [commands](https://github.com/angular/angular-cli/wiki) click on the link.

## Amexio Angular Extension - Installation

To install this library, follow the steps given below:

```bash
$ cd your-angular-project
```
## For Bootstrap 4
```bash
$ npm install amexio-ng-extensions --save
```
## OR For Bootstrap 3
```bash
$ npm install amexio-ng-extensions@1.0.42 --save
```

### Installing Dependencies (Required)
Amexio requires the following libraries to work

1) [bootstrap-datepicker](https://www.npmjs.com/package/bootstrap-datepicker)
2) [bootstrap-timepicker](https://www.npmjs.com/package/bootstrap-timepicker)
~~3) [MessengerJS (Growl Notifications)](https://codeload.github.com/HubSpot/messenger/zip/v1.4.1)~~

Include the respective JS & CSS in your app i.e if you are using Angular CLI, add the messenger.js to your "scripts"
 & the messenger.css & messenger-air-theme.css to your "styles" in .angular-cli.json.
 If not using cli then simply add it to the index.html head.


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
    AmexioWidgetModule
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
## Amexio Charting Components
Amexio Charts is provided as a seperate Module as <b>AmexioChartModule</b> available under ```amexio-ng-extensions/charts```
To begin please add the module to your Component's Module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { AmexioChartModule } from 'amexio-ng-extensions\charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AmexioChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once Amexio Charting library is imported, you could use it ,

```xml
<!-- You can now use your library component in app.component.html -->
<amexio-chart-column [data]="employeeData"></amexio-chart-column>
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

# Amexio Microsoft Visual Studio Code Extensions

This extension will help the developers of Visual Studio Code with quick code snippet for the Amexio Markup as well as Amexio TypeScript for the Angular Extensions. 

## Usage

Select the Amexio Ui Component
<img src="https://raw.githubusercontent.com/meta-magic/Amexio-VSC-Extension/master/images/Amexio-VSC-Ex-1.jpg" />

Fill up the required Component Params
<img src="https://raw.githubusercontent.com/meta-magic/Amexio-VSC-Extension/master/images/Amexio-VSC-Ex-2.jpg" />


## License

[Apache 2.0](http://www.amexio.org/metamagic-showcase/license.html) © [MetaMagic Global Inc](http://www.metamagicglobal.com/), 2017. [Amexio Angular Extensions](http://www.amexio.tech)

**Enjoy!**
