import {Action} from '@ngrx/store';
import {Product} from '../model/products.model';

export enum ProductsActionTypes{
  /*Get All product*/
  GET_ALL_PRODUCTS = "[Products] Get All products",
  GET_ALL_PRODUCTS_SUCCESS = "[Products] Get All products Success",
  GET_ALL_PRODUCTS_ERROR = "[Products] Get All products Error",

  /*Get Selected product*/
  GET_SELECTED_PRODUCTS = "[Products] Get Seleted products",
  GET_SELECTED_PRODUCTS_SUCCESS = "[Products] Get Selected products Success",
  GET_SELECTED_PRODUCTS_ERROR = "[Products] Get Selected products Error",

  /*Search Selected product*/
  SEARCH_PRODUCTS = "[Products] Search products",
  SEARCH_PRODUCTS_SUCCESS = "[Products] Search products Success",
  SEARCH_PRODUCTS_ERROR = "[Products] Search products Error",

  /*Select product*/
  SELECT_PRODUCTS = "[Products] Select product",
  SELECT_PRODUCTS_SUCCESS = "[Products] Select product Success",
  SELECT_PRODUCTS_ERROR = "[Products] Select product Error",
}

/**Get All product action*/
export class GetAllProductsAction implements Action{
  type: ProductsActionTypes = ProductsActionTypes.GET_ALL_PRODUCTS;
  constructor(public payload: any) {
  }
}

export class GetAllProductsActionSuccess implements Action{
  type: ProductsActionTypes = ProductsActionTypes.GET_ALL_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class GetAllProductsActionError implements Action{
  type: ProductsActionTypes = ProductsActionTypes.GET_ALL_PRODUCTS_ERROR;
  constructor(public payload: String) {}
}


/**Get Selected product Action*/
export class GetSelectedProductsAction implements Action{
  type: ProductsActionTypes = ProductsActionTypes.GET_SELECTED_PRODUCTS;
  constructor(public payload: any) {
  }
}

export class GetSelectedProductsActionSuccess implements Action{
  type: ProductsActionTypes = ProductsActionTypes.GET_SELECTED_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class GetSelectedProductsActionError implements Action{
  type: ProductsActionTypes = ProductsActionTypes.GET_SELECTED_PRODUCTS_ERROR;
  constructor(public payload: String) {}
}


  /**Search products */
  export class SearchProductsAction implements Action{
    type: ProductsActionTypes = ProductsActionTypes.SEARCH_PRODUCTS;
    constructor(public payload: string) {
    }
  }

  export class SearchProductsActionSuccess implements Action{
    type: ProductsActionTypes = ProductsActionTypes.SEARCH_PRODUCTS_SUCCESS;
    constructor(public payload: Product[]) {}
  }

  export class SearchProductsActionError implements Action{
    type: ProductsActionTypes = ProductsActionTypes.SEARCH_PRODUCTS_ERROR;
    constructor(public payload: String) {}
  }


  /**Select product */
  export class SelectProductAction implements Action{
    type: ProductsActionTypes = ProductsActionTypes.SELECT_PRODUCTS;
    constructor(public payload: Product) {
    }
  }

  export class SelectProductActionSuccess implements Action{
    type: ProductsActionTypes = ProductsActionTypes.SELECT_PRODUCTS_SUCCESS;
    constructor(public payload: Product) {}
  }

  export class SelectProductActionError implements Action{
    type: ProductsActionTypes = ProductsActionTypes.SELECT_PRODUCTS_ERROR;
    constructor(public payload: String) {}
  }


export type ProductsAction =
  GetAllProductsAction      | GetAllProductsActionSuccess      | GetAllProductsActionError      |
  GetSelectedProductsAction | GetSelectedProductsActionSuccess | GetSelectedProductsActionError |
  SearchProductsAction      | SearchProductsActionSuccess      | SearchProductsActionError      |
  SelectProductAction       | SelectProductActionSuccess       | SelectProductActionError
  ;
