/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Pratik Kelwalkar
 *
 */
import {AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {FormInputBase} from "../baseclass/form.base.class";
import {CommonHttpService} from "../common.http.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

declare var $;
const noop = () => {
};

export const CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropDownComponent),
    multi: true
};

export const BASE_IMPL_DROPDOWN_INPUT: any = {
    provide : FormInputBase,
    useExisting: forwardRef(() => DropDownComponent)
};
declare var $: any;
@Component({
    selector: 'amexio-dropdown',
    template: `
        <!-- Faux input to handle Bindings -->
        <input type="hidden"
               (blur)="onBlur()"
               [ngModel]="value"
               (ngModelChange)="onChange($event)"
        />

        <div class="dropdown" [style.width]="width">

            <button class="btn btn-secondary dropdown-toggle" type="button" [attr.id]="elementId" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                <ng-container *ngIf="multiSelect">
                    {{value != null || '' ? getMultiDisplayField(value) : fieldLabel}}
                </ng-container>

                <ng-container *ngIf="!multiSelect">
                    {{value != null || '' ? getDisplayField(value) : fieldLabel}}
                </ng-container>

            </button>
            <div class="dropdown-menu scrollable-options" [attr.aria-labelledby]="elementId">
                <input *ngIf="searchBox" type="text" class="dropdown-item form-control" (keyup)="onDropDownSearchKeyUp($event)"
                       placeholder="Search"/>
                <button class="dropdown-item" *ngFor="let row of filteredOptions"
                   (click)="onUserSelectionChange(row[valueField],row[displayField],row)">
                    {{row[displayField]}} <i class="fa fa-check pull-right" aria-hidden="true" *ngIf="row?.checked"></i>
                </button>

                <ng-template *ngIf="filteredOptions.length < 1">
                    <a class="dropdown-item disabled">No Options</a>
                </ng-template>

            </div>
        </div>

    `,
    providers : [CUSTOM_DROPDOWN_CONTROL_VALUE_ACCESSOR,BASE_IMPL_DROPDOWN_INPUT]
})

export class DropDownComponent extends FormInputBase implements OnInit, ControlValueAccessor {

    @Input()    dataReader : string;

    @Input()    httpMethod : string;

    @Input()    httpUrl : string;

    @Input()    displayField : string;

    @Input()    valueField : string;

    @Input()    data : any;

    @Input()    multiSelect : boolean;
    /*
     @Input()    maxMultiSelect : string;

     @Input()    multiSelectHelp : boolean;*/

    @Input()    searchBox : boolean;

    /*  @Input()    multiCountDisplay : string;*/

    @Input()    width     : string;

    @Output()   onSingleSelect : any = new EventEmitter<any>();

    @Output()   onMultiSelect : any = new EventEmitter<any>();

    multiSelectValues  : any[] = [];

    filteredOptions : any[] = [];

    responseData : any;

    nonFilteredRowData : any[] = [];

    constructor(private amxHttp: CommonHttpService) {
        super();
        this.elementId = 'dropdown-' + Math.floor(Math.random()*90000) + 10000;
    }



    ngOnInit() {
        if(this.fieldLabel == '' || this.fieldLabel == null)
            this.fieldLabel = 'Choose Option';

        if(this.httpMethod && this.httpUrl){
            this.amxHttp.fetchData(this.httpUrl,this.httpMethod).subscribe(
                response=>{
                    this.responseData = response.json();
                },
                error=>{
                },
                ()=>{
                    this.setData(this.responseData);
                }
            );

        }else if(this.data){
            this.setData(this.data);
        }
    }

    setData(httpResponse : any){
        this.multiSelectValues = [];
        let responsedata = httpResponse;
        let dr = this.dataReader.split(".");
        for(let ir = 0 ; ir<dr.length; ir++){
            responsedata = responsedata[dr[ir]];
        }
        //Sort Alphabetically
        let sortedData = responsedata.sort((a, b) => a[this.displayField].toLowerCase() !== b[this.displayField].toLowerCase() ? a[this.displayField].toLowerCase() < b[this.displayField].toLowerCase() ? -1 : 1 : 0);
        this.filteredOptions = sortedData;
        this.nonFilteredRowData = sortedData;

        if(this.multiSelect){
            let preSelectedMultiValues : string = '';
            let optionsChecked  : any [] = [];
            this.nonFilteredRowData.forEach( (row)=>{
                if(row.checked){
                    optionsChecked.push(row[this.valueField]);
                    this.multiSelectValues.push(row);
                    preSelectedMultiValues == '' ? preSelectedMultiValues += row[this.displayField] : preSelectedMultiValues += ','+row[this.displayField];
                }
            });
            this.value = optionsChecked;
            this.fieldLabel = preSelectedMultiValues;
        }
    }


    /**
     * use it to fire external model changes and reflect in dropdown
     * @param event
     */
    onChange(event : any){
        this.value = event;
    }

    /***
     *  use it to detect user selection changes and bind that to Model
     * @type {string}
     */
    onUserSelectionChange(value : any,display : any,rowData : any){
        if(this.multiSelect){
            let optionsChecked  : any [] = [];
            this.multiSelectValues = [];
            if(rowData.hasOwnProperty('checked')){
                rowData.checked = !rowData.checked;
                this.filteredOptions.forEach( (row)=>{
                    if(row.checked){
                        optionsChecked.push(row[this.valueField]);
                        this.multiSelectValues.push(row);
                    }
                });
                this.value = optionsChecked;
                this.onMultiSelect.emit(this.multiSelectValues);
            }
        }
        else{
            this.value = value;
            this.onSingleSelect.emit(rowData);
        }
    }

    /**
     * Show Multi-Selected Value's Display Field
     * @param multiSelectedValues
     */
    getMultiDisplayField(multiSelectedValues : any){
        let multiSelectDisplayString : any = '';
        this.multiSelectValues.forEach( (row)=>{
            multiSelectDisplayString== '' ? multiSelectDisplayString += row[this.displayField] : multiSelectDisplayString += ','+row[this.displayField];
        });
        if(this.multiSelectValues.length > 0)
            return multiSelectDisplayString;
        else
            return 'Choose Options';
    }

    /**
     * Show Single Selected Value's Display Field
     * @param selectedValue
     * @returns {string}
     */
    getDisplayField(selectedValue : any){
        let displaySelectedOption : string = '';
        if(this.filteredOptions != null){
            this.filteredOptions.forEach( (row)=>{
                if(row[this.valueField] == selectedValue){
                    displaySelectedOption = row[this.displayField];
                }
            });
        }
        return displaySelectedOption;
    }

    onDropDownSearchKeyUp(event : any){
        let keyword = event.target.value;
        if(keyword != null && keyword != '' && keyword!= ' '){
            this.filteredOptions = [];
            let search_Term = keyword.toLowerCase();
            this.nonFilteredRowData.forEach( (row)=>{
                if(row[this.displayField].toLowerCase().startsWith(search_Term)){
                    this.filteredOptions.push(row);
                }
            });
        }
        if(keyword == ''){
            this.filteredOptions = this.nonFilteredRowData;
        }
    }

    //The internal dataviews model
    private innerValue: any = '';

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
        // this.validate();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
