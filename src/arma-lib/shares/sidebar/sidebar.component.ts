import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { MenuActionInterface, MenuInterface } from "../../interfaces/menu.interface";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: false,
})

export class SidebarComponent implements OnChanges {
    @Input() public _in_menuAction: MenuActionInterface | null = null;

    public menus: MenuInterface[] = [];
    public sidebarActive: boolean = false;

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        console.log("Change")
        const menuAction = changes['_in_menuAction']?.currentValue; 
        this.menus = menuAction?.menuAct?.subMenu || [];
    }

    onGetSubMenuAct(menu: MenuInterface) {
        if (!!this._in_menuAction) {
            this._in_menuAction.subMenuAct = menu;
        }
    }

}