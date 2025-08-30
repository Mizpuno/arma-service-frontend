import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { OmSearchComponent } from "./search/om-search.component";

const routes: Routes = [
    {path: 'search', component: OmSearchComponent},
    {path: '', redirectTo: 'search', pathMatch: "full"},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OrderManagementRouting {}