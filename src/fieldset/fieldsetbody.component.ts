/**
 * Created by pratik on 24/12/17.
 */
/**
 * Created by ketangote on 7/20/17.
 */



import {
    Component,  OnInit
} from '@angular/core';


@Component({
    selector: 'amexio-fieldset-body',
    template: `

        <ng-content></ng-content>


    `
})

export class FieldSetBodyComponent implements OnInit{


    constructor(){
    }

    ngOnInit(){

    }



}


