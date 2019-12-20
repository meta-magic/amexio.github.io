
export class AmexioVerticalTreeModel {
    text: string;
    icon: string;
    children: AmexioVerticalTreeModel[];

    constructor(_text?: string, _icon?: string, _children?: AmexioVerticalTreeModel[]) {
        this.text = _text;
        this.icon = _icon;
        this.children = _children;

    }
}
