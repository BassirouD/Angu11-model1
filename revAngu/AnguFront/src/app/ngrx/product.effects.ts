import {Injectable} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {
  GetAllProductsActionError,
  GetAllProductsActionSuccess, GetSelectedProductsActionError,
  GetSelectedProductsActionSuccess,
  ProductsAction,
  ProductsActionTypes, SearchProductsActionError, SearchProductsActionSuccess, SelectProductActionError, SelectProductActionSuccess
} from './products.action';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductEffects{
  constructor(private prodService: ProductService, private effectActions: Actions) {
  }

  /**Get product*/
  getAllProductsEffects: Observable<Action> = createEffect(
    () => this.effectActions.pipe(
            ofType(ProductsActionTypes.GET_ALL_PRODUCTS),
            mergeMap((action: ProductsAction)=>{
              return this.prodService.getAllProducts()
                .pipe(
                  map((products) => new GetAllProductsActionSuccess(products)),
                  catchError((err) => of(new GetAllProductsActionError(err.message)))
                )
          })
      )
    );

  /**Get selected product*/
  getASelectedProductsEffects: Observable<Action> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionTypes.GET_SELECTED_PRODUCTS),
      mergeMap((action: ProductsAction)=>{
        return this.prodService.getSelectedProduct()
          .pipe(
            map((products) => new GetSelectedProductsActionSuccess(products)),
            catchError((err) => of(new GetSelectedProductsActionError(err.message)))
          )
      })
    )
  );

  /**Search selected product*/
  searchProductsEffects: Observable<ProductsAction> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionTypes.SEARCH_PRODUCTS),
      mergeMap((action: ProductsAction)=>{
        return this.prodService.searchProduct(action.payload)
          .pipe(
            map((products) => new SearchProductsActionSuccess(products)),
            catchError((err) => of(new SearchProductsActionError(err.message)))
          )
      })
    )
  );

  /**Selected product*/
  selectProductsEffects: Observable<ProductsAction> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionTypes.SELECT_PRODUCTS),
      mergeMap((action: ProductsAction)=>{
        return this.prodService.setSelected(action.payload)
          .pipe(
            map((product) => new SelectProductActionSuccess(product)),
            catchError((err) => of(new SelectProductActionError(err.message)))
          )
      })
    )
  );

}
