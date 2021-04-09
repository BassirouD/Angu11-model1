export enum ProductActionType{
  GET_ALL_PRODUCTS = '[Product] Get All products',
  GET_SELECTED_PRODUCTS = '[Product] Get Selected products',
  GET_AVAILABLE_PRODUCTS = '[Product] Get Available products',
  SEARCH_PRODUCTS = '[Product] Search products',
  NEW_PRODUCTS = '[Product] New products',
  SELECT_PRODUCTS = '[Product] Select products',
  EDIT_PRODUCTS = '[Product] Edit products',
  DELETE_PRODUCTS = '[Product] Delete products',
  PRODUCT_ADDED = '[Product] products added',
  PRODUCT_UPDATED = '[Product] products updated'
}

export interface ActionEvent{
  type: ProductActionType,
  payload?: any
}
//----------------------------------------------------------------------
export enum DataStateEnum{
  LOADING,
  LOADED,
  ERROR,
}
export interface AppDataState<T>{
  dataState?: DataStateEnum,
  data?: T,
  errorMessage?: String
}
