import { Component, EventEmitter, Output } from "@angular/core";
import { NavigationService } from "./navigation.service";
import { MenuActionInterface, MenuInterface } from "../../interfaces/menu.interface";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: false,
})

export class NavigationComponent {
    @Output() _out_menuAction: EventEmitter<MenuActionInterface | null> = new EventEmitter<MenuActionInterface | null>();
    public menus: MenuInterface[] = [];
    public menuAction: MenuActionInterface | null = null;

    constructor(
        private navigationService: NavigationService
    ){}

    ngOnInit() {
        this.getMenus();
    }

    getMenus() {
        return this.navigationService.getMenus().subscribe({
            next: (res) => {
                if (res.response.code === 200) {
                    this.menus = res.content;
                    this.menuAction = {
                        menuAct: this.menus.find(menu => !!menu.defaultFlag) || null,
                        subMenuAct: null,
                        sidebarActive: false
                    }
                } else {
                    console.error(`[${res.response.code}] ${res.response.text} : ${res.response.message}`);
                }
            },
            error: (err) => {
                console.error('Error fetching menus:', err);
            }
        });
    }

    onClickMenu(menu: MenuInterface) {
        if (!!this.menuAction) {
            if (menu.subMenu && menu.subMenu.length > 0) {
                if (!!this.menuAction?.menuAct && this.menuAction.menuAct.id === menu.id) {
                    this.menuAction.sidebarActive = !this.menuAction.sidebarActive;
                    return;
                }

                this.menuAction.menuAct = menu;
                this.menuAction.subMenuAct = null;
                this.menuAction.sidebarActive = true;
            } else {
                this.menuAction.menuAct = menu;
                this.menuAction.subMenuAct = null;
                this.menuAction.sidebarActive = false;

                // Do something with the menu action, like navigating to a route
            }
        }
        
        this._out_menuAction.emit(this.menuAction)
    }
        
}