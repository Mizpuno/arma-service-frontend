export interface MenuInterface {
    id: number;
    name: string;
    path: string;
    type: 'web' | 'title';
    defaultFlag: boolean;
    level: number;
    seq: number;
    subMenu: MenuInterface[];
}

export interface MenuActionInterface {
    menuAct: MenuInterface | null;
    subMenuAct: MenuInterface | null;
    sidebarActive: boolean;
}