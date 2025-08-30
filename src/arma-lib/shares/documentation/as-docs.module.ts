import { NgModule } from "@angular/core";
import { DocsV1Component } from "./v1/docs-v1.component";
import { AsDocsRouting } from "./as-docs-routing.module";
import { ArmaSharesModule } from "../../modules/arma-shares.module";

@NgModule({
    declarations: [
        DocsV1Component,
    ],
    imports: [
        AsDocsRouting,
        ArmaSharesModule,
    ],
    exports: [],
})

export class AsDocsModule {}