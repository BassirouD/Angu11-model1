import { Component, OnInit } from '@angular/core';
import {GetAllProductsAction, GetSelectedProductsAction, SearchProductsAction} from '../../../ngrx/products.action';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-products-navbar',
  templateUrl: './products-navbar.component.html',
  styleUrls: ['./products-navbar.component.css']
})
export class ProductsNavbarComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.store.dispatch(new GetAllProductsAction({}));
  }

  onSelectedProducts() {
    this.store.dispatch(new GetSelectedProductsAction({}))
  }


  onAvailableProducts() {

  }

  onNewProducts() {

  }

  onSearch(dataForm: any) {
    this.store.dispatch(new SearchProductsAction(dataForm.keyword));
  }
}
