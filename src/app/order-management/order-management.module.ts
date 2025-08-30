import { NgModule } from "@angular/core";
import { OmSearchComponent } from "./search/om-search.component";
import { OrderManagementRouting } from "./order-management-routing.module";
import { ArmaComponentsModule } from "../../arma-lib/modules/arma-components.module";

@NgModule({
    declarations: [
        OmSearchComponent,
    ],
    imports: [
        OrderManagementRouting,
        ArmaComponentsModule
    ],
    exports: []
})

export class orderManagementModule {}
