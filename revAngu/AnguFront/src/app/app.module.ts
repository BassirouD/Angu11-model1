import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import {HttpClientModule} from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductsNavbarComponent } from './components/products/products-navbar/products-navbar.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FormsModule} from '@angular/forms';
import {productReducer} from './ngrx/product.reducer';
import {ProductEffects} from './ngrx/product.effects';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductsItemComponent } from './components/products/products-list/products-item/products-item.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavBarComponent,
    ProductsNavbarComponent,
    ProductsListComponent,
    ProductsItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({catalogueState: productReducer}),
    EffectsModule.forRoot([ProductEffects]),
    StoreDevtoolsModule.instrument(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
