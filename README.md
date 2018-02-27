<h1 align="center">
  <br>
  <a href="http://www.amexio.tech/"><img src="https://image.ibb.co/kdy6Ev/logo.png" alt="Amexio" width="200"></a>
  <br>
  Amexio Angular EXtensions v4.0.0
  <br>
</h1>
<h2 align="center">
(A member of MetaMagic Blue Qube family)
</h2>
<br>
<div align="center">
  Amexio (Angular MetaMagic EXtensions for Inputs and Outputs) is a pure Typescript Compnent Library of Angular. We provide modular import for using our rich set of components,charts, maps , dashboard, forms, data, media, layout etc and can be easily configured and implemented in a project. Check out the Demo App built using Amexio. For the Amexio UI Library refer API documentation.
</div>
<br/>

<div align="center">
  <!-- NPM version -->
  <a href="https://npmjs.org/package/amexio-ng-extensions">
    <img src="https://badge.fury.io/js/amexio-ng-extensions.svg"
      alt="NPM version" />
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/amexio-ng-extensions">
    <img src="https://img.shields.io/npm/dm/choo.svg?style=flat-square"
      alt="Downloads" />
  </a>

   <a href="https://npmjs.org/package/amexio-ng-extensions">
    <img src="https://img.shields.io/npm/dt/amexio-ng-extensions.svg"
      alt="Downloads" />
  </a>
  <!--
  <script src="//platform.linkedin.com/in.js" type="text/javascript"> lang: en_US</script>
<script type="IN/FollowCompany" data-id="13316060" data-counter="top"></script>
-->
</div>

<div align="center">
  <h3>
    <a href="http://www.amexio.tech/">
      Website
    </a>
    <span> | </span>
    <a href="http://api.amexio.tech">
      API Docs
    </a>
    <span> | </span>
    <a href="http://demo.amexio.tech/">
      Demo SE
    </a>
    <span> | </span>
    <a href="http://eedemo.amexio.tech/">
      Demo EE
    </a>
    <span> | </span>
    <a href="http://forum.metamagicglobal.com/">
      Forum
    </a>
    <span> | </span>
    <a href="https://www.metamagicglobal.com/">
      MetaMagic Global
    </a>
  </h3>
</div>

<br/>

<div align="center">

[![NPM](https://nodei.co/npm/amexio-ng-extensions.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/amexio-ng-extensions/)
</div>
<br/>

## Browsers support <sub><sup><sub><sub>made by <a href="https://godban.github.io">godban</a></sub></sub></sup></sub>

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/opera.png" alt="Opera" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari-ios.png" alt="iOS Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome-android.png" alt="Chrome for Android" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome for Android |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| Edge| last 5 versions| last 5 versions| last 3 versions| last 4 versions| last 3 versions| last 3 versions

<img src="http://amexio.org/images/Desire-3D-Blue-Qube.jpg" />

## Table of Content
- [Features](#features)
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Installation](#amexio-angular-extension---installation)
- [Amexio Modules](#amexio-modules)
- [Amexio Themes](#amexio-themes-material--bootstrap)
- [License](#license)

## Features
- __Pure TypeScript:__ Amexio is a pure Typescript library with 0 Dependencies & Angular 5 Support.
- __Server Rending Support:__ Components support & optimized for server side rendering.
- __Highly Customizable Styling:__ Lot of customization can be done easily using the Amexio SCSS files.
- __90+ High Grade Components:__ We make sure you're nothing short of while building your app
- __Modular Support:__ Load Only what you want, amexio is Modular.


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

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';

// Import your library
import { AmexioWidgetModule,CommonDataService } from 'amexio-ng-extensions';

// To import Charts
import { AmexioChartsModule } from 'amexio-ng-extensions';

//To import Maps 
import { AmexioMapsModule } from 'amexio-ng-extensions';

// To import Dashboard
import { AmexioDashboardModule } from 'amexio-ng-extensions';


// To import Enterprise
import { AmexioEnterpriseModule } from 'amexio-ng-extensions';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AmexioWidgetModule,
    AmexioChartsModule,
    AmexioMapsModule,
    AmexioDashboardModule,
    AmexioEnterpriseModule
  ],
  providers: [CommonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
# Amexio Modules
<table> 
<tr>
<th>Amexio Modules</th>
</tr>

<tr>
<td>AmexioWidgetModule</td>
</tr>

<tr>
<td>AmexioFormsModule</td>
</tr>

<tr>
<td>AmexioDataModule</td>
</tr>

<tr>
<td>AmexioLayoutModule</td>
</tr>

<tr>
<td>AmexioPaneModule</td>
</tr>

<tr>
<td>AmexioNavModule</td>
</tr>

<tr>
<td>AmexioMediaModule</td>
</tr>

<tr>
<td>AmexioMapsModule</td>
</tr>

<tr>
<td>AmexioChartsModule</td>
</tr>

<tr>
<td>AmexioDashBoardModule</td>
</tr>

<tr>
<td>AmexioEnterpriseModule</td>
</tr>

</table>

# Amexio Themes (Amexio / Amexio Material)

To use the default theme import the
`../node_modules/amexio-ng-extensions/styles/mda/at-md-blue.scss`
in your app styles.scss
Or refer the below table for other themes provided.

<table> 
<tr>
<th>Amexio Material Themes</th>
<th>Amexio Themes</th>
</tr>
<tr>
 <td>AT-MD-Gold-Amber</td>
 <td>AT-AM-Ocean-Blue</td>
</tr>
<tr>
 <td>AT-MD-Army-Olive</td>
 <td>AT-AM-Tiger</td>
</tr>
<tr>
<td>AT-MD-Ash Stone Black</td>
<td>AT-AM-Lime Green</td> 
</tr>
<tr>
 <td>AT-MD-Black</td>
 <td>AT-AM-Matrix</td>
</tr>
<tr>
 <td>AT-MD-Blue</td>
 <td>AT-AM-Spicy-Apricot</td>
</tr>
<tr>
	<td>AT-MD-Blue-Grey</td>
	<td>AT-AM-Byzantine-Crystal</td>
</tr>
<tr>
	<td>AT-MD-Ginger-Bread</td>
	<td>AT-AM-Honey-Prussian</td>
</tr>
<tr>
	<td>AT-MD-Cerise Magneta</td>
	<td>AT-AM-Persian-Laguna</td>
</tr>
<tr>
	<td>AT-MD-Charcoal Russet</td>
	<td>AT-AM-Burgandy-Magenta</td>
</tr>
<tr>
	<td>AT-MD-Fern-Lime</td>
	<td>AT-AM-Navy-Grape</td>
</tr>
<tr>
 <td>AT-MD-Frenchrose-mulberry</td>
 <td>AT-AM-Matrix-Amber</td>
</tr>
<tr>
 <td>AT-MD-Grape-Voliet</td>
 <td>AT-AM-Matrix-Cream</td>
</tr>

<tr>
 <td>AT-MD-Hot-Pink-Fuchsia</td>
 <td>AT-AM-Matrix-Maya</td>
</tr>

<tr>
 <td>AT-MD-Saphire</td>
 <td>AT-AM-Matrix-Ultra</td>
</tr>

<tr>
 <td>AT-MD-Jungle-Mint</td>
 <td>AT-AM-Royal-Kelly</td>
</tr>

<tr>
 <td>AT-MD-Maya-Light-Blue</td>
 <td>AT-AM-Royal-Pineapple</td>
</tr>

<tr>
 <td>AT-MD-Mahogany Barny Red</td>
 <td></td>
</tr>

<tr>
 <td>AT-MD-Navy Egyptian</td>
 <td></td>
</tr>

<tr>
 <td>AT-MD-Raspberry Sangria</td>
 <td></td>
</tr>


<tr>
 <td>AT-MD-Red Maroon</td>
 <td></td>
</tr>

<tr>
 <td>AT-MD-Sacremento Jado</td>
 <td></td>
</tr>

<tr>
 <td>AT-MD-Yale Azure</td>
 <td></td>
</tr>

<tr>
 <td>At-MD-Tronbone Royal</td>
 <td></td>
</tr>

<tr>
 <td>AT-MD-Pineapple-Flaxen</td>
 <td></td>
</tr>

<tr>
 <td>AT-MD-Pumpkin-Fire</td>
 <td></td>
</tr>

<tr>
 <td>AT-MD-Mauve-Orchid</td>
 <td></td>
</tr>

<tr>
 <td>AT-MD-Honey-Mustard</td>
 <td></td>
</tr>

<tr>
 <td>AT-MD-Bruntor-Tangerine</td>
 <td></td>
</tr>
</table>

# Amexio Microsoft Visual Studio Code Extensions

This extension will help the developers of Visual Studio Code with quick code snippet for the Amexio Markup as well as Amexio TypeScript for the Angular Extensions.
<ul>
<li>Available for v3.x series</li>
<li>Plugin for v4.0 will be available in the first week of Feb 2018.</li>
</ul>

## Usage

Select the Amexio Ui Component
<img src="https://raw.githubusercontent.com/meta-magic/Amexio-VSC-Extension/master/images/Amexio-VSC-Ex-1.jpg" />

Fill up the required Component Params
<img src="https://raw.githubusercontent.com/meta-magic/Amexio-VSC-Extension/master/images/Amexio-VSC-Ex-2.jpg" />


## License

Copyright © [MetaMagic Global Inc](http://www.metamagicglobal.com/), 2017-18. [Amexio Angular EXtensions](http://www.amexio.tech). All rights reserved.

Licensed under the [Apache 2.0](http://www.amexio.org/metamagic-showcase/license.html)  License.

**Enjoy!**
