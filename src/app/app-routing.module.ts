import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'order-management', loadChildren: () => import('./order-management/order-management.module').then(m => m.orderManagementModule)},
  {path: 'documentation', loadChildren: () => import('../arma-lib/shares/documentation/as-docs.module').then(m => m.AsDocsModule)},
  // {path: '', redirectTo: 'default'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
