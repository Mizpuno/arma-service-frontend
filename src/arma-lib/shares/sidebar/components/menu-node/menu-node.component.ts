import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MenuActionInterface, MenuInterface } from "../../../../interfaces/menu.interface";

@Component({
    selector: 'menu-node',
    templateUrl: './menu-node.component.html',
    styleUrls: ['./menu-node.component.scss'],
    standalone: false,
})

export class MenuNodeComponent {
    @Output() public _out_subMenuAct: EventEmitter<MenuInterface> = new EventEmitter<MenuInterface>;
    @Input() public _in_menuAction: MenuActionInterface | null = null;
    @Input() public _in_menu: MenuInterface | null = null;

    constructor() {}   

    onMenuClick(menu: MenuInterface) {
        if (!!this._in_menuAction) {
            this._in_menuAction.subMenuAct = menu; 
            this._out_subMenuAct.emit(menu)
        }
    }

    onGetSubMenuAct(menu: MenuInterface) {
        if (!!this._in_menuAction) {
            this._in_menuAction.subMenuAct = menu;
        }
    }
}