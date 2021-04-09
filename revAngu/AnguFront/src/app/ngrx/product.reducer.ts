import {Product} from '../model/products.model';
import {ProductsAction, ProductsActionTypes} from './products.action';
import {Action} from '@ngrx/store';

export enum ProductsStateEnum{
  LOADING,
  LOADED,
  ERROR,
  INITIAL,
}

export interface ProductState{
  products: Product[];
  errorMessage: string;
  dataState: ProductsStateEnum;
}

const initState: ProductState = {
  products: [],
  errorMessage: '',
  dataState: ProductsStateEnum.INITIAL
}

export function productReducer(state: ProductState = initState,
                               action: Action): ProductState{
  switch (action.type){
    /**Get All Product action*/
    case ProductsActionTypes.GET_ALL_PRODUCTS:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {...state, dataState: ProductsStateEnum.LOADED,
          products: (<ProductsAction>action).payload};
    case ProductsActionTypes.GET_ALL_PRODUCTS_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR,
        errorMessage: (<ProductsAction>action).payload};

      /**Get selected action*/
    case ProductsActionTypes.GET_SELECTED_PRODUCTS:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionTypes.GET_SELECTED_PRODUCTS_SUCCESS:
      return {...state, dataState: ProductsStateEnum.LOADED,
        products: (<ProductsAction>action).payload};
    case ProductsActionTypes.GET_SELECTED_PRODUCTS_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR,
        errorMessage: (<ProductsAction>action).payload};

    /**Search selected action*/
    case ProductsActionTypes.SEARCH_PRODUCTS:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionTypes.SEARCH_PRODUCTS_SUCCESS:
      return {...state, dataState: ProductsStateEnum.LOADED,
        products: (<ProductsAction>action).payload};
    case ProductsActionTypes.SEARCH_PRODUCTS_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR,
        errorMessage: (<ProductsAction>action).payload};

    /**Selected action*/
    case ProductsActionTypes.SELECT_PRODUCTS:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionTypes.SELECT_PRODUCTS_SUCCESS:
      const product: Product = (<ProductsAction>action).payload;
      let listProduct = [...state.products];
      let data: Product[] = listProduct.map(p => p.id == product.id? product: p);
      return {...state, dataState: ProductsStateEnum.LOADED, products: data};
    case ProductsActionTypes.SELECT_PRODUCTS_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR,
        errorMessage: (<ProductsAction>action).payload}

    default: return {...state};
  }
}
