<a href="https://amexio.org/">
    <img src="https://image.ibb.co/ca0NMa/dashboard.png" alt="Amexio Charts" title="Amexio" align="right" height="60" />
</a>


Amexio Dashboard Module
======================
<div align="center">
<h5 align="left">Sample Screens</h5>

  <a href="http://amexio.org/demoapp/">
    <img src="https://preview.ibb.co/mz1zjv/dashboard.png"
      alt="ScreenShot" />
  </a>
    
</div>

<div align="center">
  <a href="http://amexio.org/demoapp/">
    <img src="https://image.ibb.co/jvE8cF/dashboard_gauge.png"
      alt="ScreenShot" />
      </a>
</div>



## Table of content

- [Installation](#installation)
    - [Loading Dependency](#dependency-google-chart-js)
    - [Importing Module](#dependency-google-chart-js)
- [Available Dasboard Components](#available-charts)
- [License](#license)


## Installation
To import the Module, you first need to fetch the Amexio Package from npm using command ```bash $ npm install amexio-ng-extensions@latest --save ```
Note : <b>AmexioDashboardModule</b> is not available under amexio-ng-extensions@1.x.x Series

## Dependency (Google Chart JS)
Simple add this script tag to your index.html
```xml
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
```

## Importing Module
Import the chart module as demonstrated as below

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { AmexioDashboardModule } from 'amexio-ng-extensions/dashboard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AmexioDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Available Charts

| Components    |
| ------------- |
| Gauge Chart   |
| Data Point    |



## License

[Apache 2.0](http://www.amexio.org/metamagic-showcase/license.html) © [MetaMagic Global Inc](http://www.metamagicglobal.com/), 2017. [Amexio Angular Extensions](http://www.amexio.tech)

**Enjoy!**
