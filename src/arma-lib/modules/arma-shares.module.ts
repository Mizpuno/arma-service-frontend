import { NgModule } from "@angular/core";
import { NavigationComponent } from "../shares/navigation/navigation.component";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "../shares/sidebar/sidebar.component";
import { MenuNodeComponent } from "../shares/sidebar/components/menu-node/menu-node.component";
import { ArmaComponentsModule } from "./arma-components.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ArmaCommonsModule } from "./arma-commons.module";

const SHARE_COMPONENTS = [
    NavigationComponent,
    SidebarComponent,
    MenuNodeComponent,
]

const IMPORT_COMPONENTS = [
    ArmaComponentsModule,
]

@NgModule({
    declarations: [
        ...SHARE_COMPONENTS
    ],
    imports: [
        ...IMPORT_COMPONENTS,
    ],
    exports: [
        ...SHARE_COMPONENTS,
        ...IMPORT_COMPONENTS,
    ],
    providers: []
})

export class ArmaSharesModule {}