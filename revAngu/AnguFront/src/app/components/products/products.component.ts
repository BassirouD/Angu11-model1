import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {ProductsStateEnum, ProductState} from '../../ngrx/product.reducer';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsState$: Observable<ProductState> | null = null;
  readonly DataStateEnum = ProductsStateEnum;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    // this.onGetAllProducts();
    this.productsState$ = this.store.pipe(
      map((state)=> {return state.catalogueState}),
      startWith()
    )
  }
}
