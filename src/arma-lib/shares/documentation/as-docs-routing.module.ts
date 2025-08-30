import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DocsV1Component } from "./v1/docs-v1.component";

const routes: Routes = [
    {path: 'v1', component: DocsV1Component},
    {path: '', redirectTo: 'v1', pathMatch: 'full'}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AsDocsRouting {}