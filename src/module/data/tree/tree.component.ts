/**
 * Created by ketangote on 11/23/17.
 */

/*
Component Name : Amexio tree filter
Component Selector : <amexio-tree-filter-view>
Component Description : A Expandable Tree Component for Angular, having Filtering functionality.
*/
import {
    AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnDestroy,
    OnInit, Output, Renderer2, TemplateRef,
} from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';

@Component({
    selector: 'amexio-treeview', templateUrl: './tree.component.html',
})
export class AmexioTreeViewComponent implements AfterViewInit, OnInit, OnDestroy {
    private componentLoaded: boolean;
    /*
   Properties
   name : data
   datatype : any
   version : 4.0 onwards
   default : none
   description : Local Data binding.
   */
    _data: any;
    @Input('data')
    set data(value: any[]) {
        this._data = value;
        if (this.componentLoaded) {
            this.updateComponent();
        }
    }
    get data(): any[] {
        return this._data;
    }

    /*
   Properties
   name : http-url
   datatype : string
   version : 4.0 onwards
   default : none
   description : REST url for fetching data.
   */
    @Input('http-url') httpurl: string;

    /*
   Properties
   name : http-method
   datatype : string
   version : 4.0 onwards
   default : none
   description : Type of HTTP call, POST,GET etc.
   */
    @Input('http-method') httpmethod: string;

    /*
   Properties
   name : data-reader
   datatype : string
   version : 4.0 onwards
   default : none
   description : Key in JSON Datasource for records.
   */
    @Input('data-reader') datareader: string;

    /*
    Properties
    name : display-key
    datatype : string
    version : 5.2.0 onwards
    default : text
    description : Name of key inside response data to display on ui.
    */
    @Input('display-key') displaykey: string;
    /*
   Properties
   name : child-array-key
   datatype : string
   version : 5.2.0 onwards
   default : children
   description : Name of key for child array name inside response data to display on ui.
   */
    @Input('child-array-key') childarraykey: string;

    /*
    Events
    name : nodeClick
    datatype : none
    version : none
    default : none
    description : It will gives you clicked node data.
    */
    @Output() nodeClick: any = new EventEmitter<any>();

    /*
   Properties
   name : enable-checkbox
   datatype : false
   version : 4.0 onwards
   default : none
   description : Enables checkbox for each row, this allows user for multi selection.
   */
    @Input('enable-checkbox') enablecheckbox = false;

    /*
   Properties
   name : templates
   datatype : any
   version : 4.0 onwards
   default : none
   description : user can add any template to tree
   */
    @Input() templates: any;

    /*
    Properties
    name : enable-drag
    datatype : boolean
    version : 5.0.0 onwards
    default : false
    description : nodes can be dragged
    */
    @Input('enable-drag') enabledrag: boolean;

    /*
    Properties
    name : enable-drop
    datatype : boolean
    version : 5.0.0 onwards
    default : false
    description : any node can be dropped in the tree structure
    */
    @Input('enable-drop') enabledrop = false;

    /*
   Properties
   name : across-tree
   datatype : boolean
   version : 5.0.0 onwards
   default : false
   description : Dragging and dropping is possible across tree.
   */
    @Input('across-tree') acrosstree = false;

    /*
   Properties
   name : badge
   datatype : boolean
   version : 5.0.0 onwards
   default : false
   description : Describes the badge value that has to be displayed tree node
   */
    @Input('badge') badge: boolean;

    /*
   Properties
   name : context-menu
   datatype : string
   version : 5.0.1 onwards
   default :
   description : Context Menu provides the list of menus on right click.
   */
    @Input('context-menu') contextmenu: any[];

    @Input() parentRef: any;

    @Input('filter-tree-flag') filtertreeflag = false;

    @ContentChild('amexioTreeTemplate') parentTmp: TemplateRef<any>;
    /*
    Events
    name : onTreeNodeChecked
    datatype : any
    version : 4.0 onwards
    default : none
    description : It will gives whole tree data with checked flag status.
    */
    @Output() onTreeNodeChecked: any = new EventEmitter<any>();

    @Output() onDrag: any = new EventEmitter<any>(); // Emits at drag
    @Output() onDrop: any = new EventEmitter<any>(); // emits at drop
    @Output() dragover: any = new EventEmitter<any>(); // Emits at drag over
    @Input() dragData: any;

    @Output() nodeRightClick: any = new EventEmitter<any>();

    @Output() rightClick: any = new EventEmitter<any>();

    previousValue: any;

    responseData: any;

    isNode: boolean;

    flag: boolean;

    posixUp: boolean;

    rightClickNodeData: any;

    contextStyle: any;

    mouseLocation: { left: number; top: number } = { left: 0, top: 0 };

    globalClickListenFunc: () => void;

    @Input('global-tree-data') globalTreeData: any[] = [];
    cloneContextMenuData: any = [];
    constructor(
        public element: ElementRef, public dataService: CommonDataService,
        private cdf: ChangeDetectorRef, private renderer: Renderer2,
    ) {
        this.isNode = true;
        this.acrosstree = false;
        this.displaykey = 'text';
        this.childarraykey = 'children';
    }

    ngOnInit() {
        if (this.contextmenu && this.contextmenu.length > 0) {
            this.cloneContextMenuData = JSON.parse(JSON.stringify(this.contextmenu));
        }
        if (this.httpmethod && this.httpurl) {
            this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response: any) => {
                this.responseData = response;
            }, (error: any) => {
            }, () => {
                this.setData(this.responseData);
            });
        } else if (this.data) {
            this.setData(this.data);
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.parentTmp != null) {
                this.templates = { treeNodeTemplate: this.parentTmp };
            } else if (this.templates != null) {
                this.parentTmp = this.templates.treeNodeTemplate;
            }
        });
        this.cdf.detectChanges();
        this.componentLoaded = true;
    }

    updateComponent() {
        if (JSON.stringify(this.previousValue) !== JSON.stringify(this.data) && this.previousValue != null && this.data != null) {
            this.previousValue = JSON.parse(JSON.stringify(this.data));
            this.setData(this.data);
        }
    }
    public expandAll(node: any) {
        this.expandAllCall(this.parentRef);
    }

    expandAllCall(node: any) {
        node.forEach((childCheck: any) => {
            if (!childCheck.expand) {
                childCheck.expand = true;
            }
            if (childCheck.hasOwnProperty(this.childarraykey)) {
                this.expandAllCall(childCheck[this.childarraykey]);
            }
        });
    }

    collapseAll(node: any) {
        this.collapseAllCall(this.parentRef);
    }

    collapseAllCall(node: any) {
        node.forEach((childCheck: any) => {
            if (childCheck.expand) {
                childCheck.expand = false;
            }
            if (childCheck.hasOwnProperty(this.childarraykey)) {
                this.collapseAllCall(childCheck[this.childarraykey]);
            }
        });
    }
    onClick(node: any) {
        node.expand = !node.expand;
    }
    onArrowDown(event: any, data: any, node: any, index: any) {
        const incrementindex = index + 1;
        const itemid = data[incrementindex];
        if (node.expand === true && node[this.childarraykey]) {
            const data1 = node[this.childarraykey][0];
            this.setFocus(data1);
        } else {
            if (incrementindex < data.length) {
                this.setFocus(itemid);
            } else {
                this.focusTONextParent(node);
            }
        }
    }
    onArrowUp(data: any, node: any, index: any) {
        const newindex = index - 1;
        if (newindex >= 0) {
            const previousindex = data[newindex];
            this.setFocus(previousindex);
            this.focusToInnerLastItem(previousindex);
        } else {
            const id = node.elementId;
            const spiltID = this.splitID(id);
            const randomnumber = spiltID[0];
            const currentid = spiltID[1];
            const newid = parseInt(currentid.slice(0, -1), 10);
            const id2: any = newid;
            const focusid1 = randomnumber + '-' + id2;
            if (document.getElementById(focusid1)) {
                document.getElementById(focusid1).focus();
            }
        }
    }
    focusToInnerLastItem(node: any) {
        if (node.hasOwnProperty('expand') && node.expand && node[this.childarraykey]) {
            node[this.childarraykey].forEach((innernode: any) => {
                this.focusToInnerLastItem(innernode);
            });
        } else {
            this.setFocus(node);
        }
    }
    focusTONextParent(node: any) {
        const sliceId = this.splitID(node.elementId);
        const randomnumber = sliceId[0];
        const currentid = sliceId[1];

        const newid = parseInt(currentid.slice(0, -1), 10);
        const currentitem: any = newid + 1;
        const focusid1 = randomnumber + '-' + currentitem;
        if (document.getElementById(focusid1)) {
            document.getElementById(focusid1).focus();
        } else {
            const nextnewid = parseInt(currentitem.toString().slice(0, -1), 10);
            const id3: any = nextnewid + 1;
            const focusid2 = randomnumber + '-' + id3;
            if (document.getElementById(focusid2)) {
                document.getElementById(focusid2).focus();
            }
        }
    }
    splitID(id: any) {
        return id.split('-');
    }
    setFocus(focuselement: any) {
        if (document.getElementById(focuselement.elementId)) {
            document.getElementById(focuselement.elementId).focus();
        }
    }
    onNodeClick(node: any) {
        const cloneNode = JSON.parse(JSON.stringify(node));
        this.cloneMethod(cloneNode);
        this.nodeClick.emit(cloneNode);
        this.activateNode(this.data, node);
    }

    cloneMethod(cloneNode: any) {
        delete cloneNode['elementId'];
        if (cloneNode.children) {
            cloneNode.children.forEach((element: any) => {
                this.cloneMethod(element);
            });
        }
    }
    generateIndex(data: any, parentId: number, rannumber: any) {
        data.forEach((element: any, index: number) => {
            element['elementId'] = '' + rannumber + '-' + parentId + (index + 1);
            if (element[this.childarraykey]) {
                this.generateIndex(element[this.childarraykey], element.elementId.split('-')[1], rannumber);
            }
        });
    }

    activateNode(data: any[], node: any) {
        for (const i of data) {
            if (node === data[i] && !i[this.childarraykey]) {
                i['active'] = true;
            } else {
                i['active'] = false;
            }

            if (i[this.childarraykey]) {
                this.activateNode(i[this.childarraykey], node);
            }
        }
    }

    setData(httpResponse: any) {
        // Check if key is added?
        let responsedata = httpResponse;
        if (this.datareader != null) {
            const dr = this.datareader.split('.');
            for (const ir of dr) {
                responsedata = responsedata[ir];
            }
        } else {
            responsedata = httpResponse;
        }
        this.data = responsedata;
        this.parentRef = this.data;
        if (this.globalTreeData.length === 0 && !this.filtertreeflag) {
            this.globalTreeData = this.data;
            this.generateIndex(this.globalTreeData, 1, Math.floor(Math.random() * 1000 + 999 + 1));
        }
        this.setSelectedFlag();
        this.activateNode(this.data, null);
    }
    // To add isSelected flag explicitily in tree Data
    setSelectedFlag() {
        if (this.parentRef && this.parentRef.length > 0) {
            this.parentRef.forEach((node: any) => {
                if (node) {
                    if (node.hasOwnProperty('isSelected')) {
                        node.isSelected = false;
                    } else {
                        node['isSelected'] = false;
                    }
                    if (node.hasOwnProperty(this.childarraykey) && node[this.childarraykey] && node[this.childarraykey].length > 0) {
                        this.setSelectedFlagInChild(node);
                    }
                }
            });
        }
    }
    setSelectedFlagInChild(node: any) {
        if (node[this.childarraykey] && node[this.childarraykey].length > 0) {
            node[this.childarraykey].forEach((childcom: any) => {
                if (childcom.hasOwnProperty('isSelected')) {
                    childcom.isSelected = false;
                } else {
                    childcom['isSelected'] = false;
                }
                if (childcom.hasOwnProperty(this.childarraykey)
                    && childcom[this.childarraykey] && childcom[this.childarraykey].length > 0) {
                    this.setSelectedFlagInChild(childcom);
                }
            });
        }
    }

    emitCheckedData(checkedData: any) {
        checkedData.checked = !checkedData.checked;
        if (checkedData.checked) {
            if (checkedData.hasOwnProperty(this.childarraykey)) {
                checkedData[this.childarraykey].forEach((option: any) => {
                    option.checked = true;
                    if (option.hasOwnProperty(this.childarraykey)) {
                        this.setCheckedStatusFromParent(option);
                    }
                });
            }
            this.emitData(checkedData);
        } else {
            if (checkedData.hasOwnProperty(this.childarraykey)) {
                checkedData[this.childarraykey].forEach((option: any) => {
                    option.checked = false;
                    if (option.hasOwnProperty(this.childarraykey)) {
                        this.searchObject(option);
                    }
                });
            }
            this.emitData(checkedData);
        }
    }

    emitData(data: any) {
        const obj = {};
        for (const [key, value] of Object.entries(data)) {
            if (key !== 'id') {
                obj[key] = value;
            }
        }
        this.onTreeNodeChecked.emit(obj);
    }

    searchObject(object: any) {
        object[this.childarraykey].forEach((childOption: any) => {
            childOption.checked = false;
            if (childOption.hasOwnProperty(this.childarraykey)) {
                this.searchObject(childOption);
            }
        });
    }

    setCheckedStatusFromParent(object: any) {
        object[this.childarraykey].forEach((childOption: any) => {
            childOption.checked = true;
            if (childOption.hasOwnProperty(this.childarraykey)) {
                this.setCheckedStatusFromParent(childOption);
            }
        });
    }

    onTreeNodeCheck(data: any) {
        this.onTreeNodeChecked.emit(data);
    }

    // Method to drag parent with node
    onDragStart(dragData: any) {
        dragData.event.dataTransfer.setData('treenodedata', JSON.stringify(dragData.data));
        dragData.event.dataTransfer.effectAllowed = 'copy';
        this.dragData = dragData;
        this.onDrag.emit(dragData);
    }

    allowDrop(dragOverData: any) {
        dragOverData.event.preventDefault();
        if (!this.enabledrop) {
            dragOverData.event.dataTransfer.dropEffect = 'none';
        }
        this.noDragMethod(this.dragData, dragOverData.data, dragOverData.event);
        this.dragover.emit(dragOverData);
    }

    noDragMethod(dragData: any, node: any, event: any) {
        if (!this.acrosstree) {
            if (dragData.data === node || node.leaf === true) {
                event.dataTransfer.dropEffect = 'none';
            } else {
                event.target.style.border = '3px dotted green';
            }
        } else {
            if (node.leaf === true) {
                event.dataTransfer.dropEffect = 'none';
            } else {
                event.target.style.border = '3px dotted green';
            }
        }
        if (dragData.data.hasOwnProperty(this.childarraykey)) {
            this.getDropNode(dragData, node, event);
        }
    }

    getDropNode(dragData: any, node: any, event: any) {
        if (JSON.stringify(dragData.data) === JSON.stringify(node)) {
            event.dataTransfer.dropEffect = 'none';
        } else if (dragData.data[this.childarraykey] && dragData.data[this.childarraykey].length > 0) {
            dragData.data[this.childarraykey].forEach((child: any) => {
                if (JSON.stringify(child) === JSON.stringify(node) || node.leaf === true) {
                    event.dataTransfer.dropEffect = 'none';
                } else if (child.hasOwnProperty(this.childarraykey)) {
                    this.getDropNode({ data: child, event1: event }, node, event);
                }
            });
        }
    }
    drop(dropData: any) {
        if (this.enabledrop) {
            dropData.event.target.style.border = '';
            dropData.event.preventDefault();
            if (this.acrosstree === false) {
                this.setDropAcrosstree(dropData);
                if (this.isNode === true) {
                    this.setDropNodeTree(dropData);
                }
            } else {
                if (dropData.data.hasOwnProperty(this.childarraykey)) {
                    this.removeNode(dropData);
                    dropData.data[this.childarraykey].push(JSON.parse(dropData.event.dataTransfer.getData('treenodedata')));
                    this.onDrop.emit(dropData);
                }
            }
        }
    }
    // drop method split into 2 other method setDropAcrosstree, setDropNodeTree
    // first method of drop
    setDropAcrosstree(dropData: any) {
        if (this.dragData.data === dropData.data) {
            this.isNode = false;
        } else if (this.dragData.data.hasOwnProperty(this.childarraykey)) {
            this.checkNode(this.dragData, dropData);
        }
    }
    // second method pf drop
    setDropNodeTree(dropData: any) {
        if (dropData.data.hasOwnProperty(this.childarraykey)) {
            this.removeNode(dropData);
            dropData.data[this.childarraykey].push(JSON.parse(dropData.event.dataTransfer.getData('treenodedata')));
            this.onDrop.emit(dropData);
        }
    }

    checkNode(dragData: any, dropData: any) {
        this.dragData.data[this.childarraykey].forEach((child: any) => {
            if (JSON.stringify(child) === JSON.stringify(dropData.data)) {
                this.isNode = false;
            } else if (child.hasOwnProperty(this.childarraykey)) {
                this.checkNode(child, dropData);
            }
        });
    }

    removeNode(data: any) {
        this.removeDragNode(this.parentRef, JSON.parse(data.event.dataTransfer.getData('treenodedata')));
    }

    removeDragNode(treeData: any, dragNode: any) {
        treeData.forEach((childNode: any, index: number) => {
            if (JSON.stringify(childNode) === JSON.stringify(dragNode)) {
                treeData.splice(index, 1);
            } else if (childNode.hasOwnProperty(this.childarraykey)) {
                this.removeDragNode(childNode[this.childarraykey], dragNode);
            }
        });
    }

    dragleave(event: any) {
        event.target.style.border = '';
    }

    getContextMenu() {
        this.contextmenu = this.cloneContextMenuData;
        if (this.contextmenu && this.contextmenu.length > 0) {
            this.flag = true;
            this.addListner();
        }
    }

    resetFlag() {
        if (this.flag) {
            this.flag = false;
            this.setSelectedFlag();
        }
    }

    loadContextMenu(rightClickData: any) {
        this.setSelectedFlag();
        this.mouseLocation.left = rightClickData.event.clientX;
        this.mouseLocation.top = rightClickData.event.clientY;
        rightClickData.data['isSelected'] = true;
        if (rightClickData.data.hasOwnProperty('rightClickData') && rightClickData.data.rightClickData.length > 0) {
            this.contextmenu = [];
            this.contextmenu = rightClickData.data.rightClickData;
            this.flag = true;
            this.addListner();
        } else {
            this.getContextMenu();
        }
        this.posixUp = this.getListPosition(rightClickData.ref);
        if (this.contextmenu && this.contextmenu.length > 0) {
            rightClickData.event.preventDefault();
            rightClickData.event.stopPropagation();
        }
        this.rightClickNodeData = rightClickData.data;
        this.nodeRightClick.emit(rightClickData);
    }

    getListPosition(elementRef: any): boolean {
        const height = 240; // must be same in dropdown.scss
        if ((window.screen.height - elementRef.getBoundingClientRect().bottom) < height) {
            return true;
        } else {
            return false;
        }
    }

    rightClickDataEmit(Data: any) {
        this.rightClick.emit(Data);
    }

    addListner() {
        this.globalClickListenFunc = this.renderer.listen('document', 'click', (e: any) => {
            this.resetFlag();
            if (!this.flag) {
                this.removeListner();
            }
        });
    }

    removeListner() {
        if (this.globalClickListenFunc) {
            this.globalClickListenFunc();
        }
    }

    ngOnDestroy(): void {
        this.removeListner();
    }
}
