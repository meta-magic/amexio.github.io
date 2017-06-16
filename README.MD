# amexio-angular-extension

## Installation

To install this library, run:

```bash
$ npm install amexio-angular-extension --save-dev
```

## Consuming Amexio Widget library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install amexio-angular-extension
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import a single module  library
import { AmexioWidgetsModule } from 'amexio-angular-extension';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AmexioWidgetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


Once AmexioWidget library is imported, you can use its components in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<amexio-text-input [label]="'Sample Text'" [(ngModel)]="model.example"></amexio-text-input>
```


## License
Link : <a href="http://13.58.2.29/metamagic-showcase/license.html">License Page</a><br>
Apache 2 License © 2017 [MetaMagic Global](mailto:info@metamagic.in)
