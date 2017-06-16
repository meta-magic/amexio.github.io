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

/**
User can select single Module <code>AmexioWidgetsModule</code> which will provide you with all the components or
you could opt for single component based such as <code>AmexioDataTableModule</code> <code>AmexioCheckBoxModule</code> etc.
**/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AmexioWidgetsModule  // OR Single Module AmexioDataTableModule,etc.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

List Of Available Modules for specific components :

Component Name         | Module Name
---------------------- | ---------------------
Amexio Button          | AmexioBtnModule
Amexio Button Dropdown | AmexioBtnDropdownModule
Amexio Button Group    | AmexioBtnGroupModule
Amexio Carousel        | AmexioCarouselModule
Amexio CheckBox        | AmexioCheckBoxModule
Amexio DataGrid        | AmexioDataTableModule
Amexio DropDown        | AmexioDropDownModule
Amexio Email           | AmexioEmailModule
Amexio FileUpload      | AmexioFileUploadModule
Amexio Hidden Field    | AmexioHiddenModule
Amexio Item Selector   | AmexioItemSelectorModule
Amexio Number Field    | AmexioNumberModule
Amexio Password Field  | AmexioPasswordModule
Amexio Progress Bar    | AmexioProgressModule
Amexio Radio Field     | AmexioRadioModule
Amexio Rating Field    | AmexioRatingModule
Amexio Tab Pane        | AmexioTabPaneModule
Amexio Text Area       | AmexioTextAreaModule
Amexio Text Field      | AmexioTextInputModule
Amexio Tree Table      | AmexioTreeTableModule
Amexio Tree view       | AmexioTreeModule


Once AmexioWidget library is imported, you can use its components in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<amexio-text-input [label]="'Sample Text'" [(ngModel)]="model.example"></amexio-text-input>
```


## License
Link : <a href="http://13.58.2.29/metamagic-showcase/license.html">License Page</a><br>
Apache 2 License © 2017 [MetaMagic Global](mailto:info@metamagic.in)
