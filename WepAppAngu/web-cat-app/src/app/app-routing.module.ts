import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './components/products/products.component';
import {HomeComponent} from './components/home/home.component';
import {ProductAddComponent} from './components/product-add/product-add.component';
import {ProductEditComponent} from './components/product-edit/product-edit.component';
import {SideBarComponent} from './components/side-bar/side-bar.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: '', component: HomeComponent},
  {path: 'newProduct', component: ProductAddComponent},
  {path: 'editProduct/:id', component: ProductEditComponent},
  {path: 'sideBar', component: SideBarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
