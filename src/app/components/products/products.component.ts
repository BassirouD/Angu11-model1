import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionType} from '../../state/product.state';
import {Router} from '@angular/router';
import {EventDriverService} from '../../state/event.driver.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //---------(1)-----products?: Product[];  // ou products?: Product[]|null=null;
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private prodService: ProductsService,
              private router:Router,
              private eventDriverService: EventDriverService
              ) { }

  ngOnInit(): void {
    this.onGetAllproducts();
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent: ActionEvent)=>{
      this.onActionEvent(actionEvent);
    });
  }

  onGetAllproducts(){
    //----------------------(1)-------------------
    // return this.prodService.getAllProducts()
    //   .subscribe(data=>{
    //     this.products = data;
    //   },error => {console.log(error)})
    //----------------ou----------------------
    this.products$ = this.prodService.getAllProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data: data})}),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  onSelectedProducts() {
    this.products$ = this.prodService.getSelectedProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data: data})}),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  onAvailableProducts() {
    this.products$ = this.prodService.getAvailableProducts().pipe(
      map(data=>
         ({dataState: DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  onSearch(dataForm: any) {
    this.products$ = this.prodService.searchProducts(dataForm.keyword).pipe(
      map(data=>
        ({dataState: DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage:err.message}))
    )
  }

  onSelect(p: Product) {
    this.prodService.select(p)
      .subscribe(data=>{
        p.selected = data.selected;
      })
  }

  onDelete(p: Product) {
    let conf  = confirm("Etes-vous sur de vouloir supprimer?");
    // if (!conf) return;
    if (conf){
      this.prodService.delete(p)
        .subscribe(data=>{
          alert('deleted')
          this.onGetAllproducts();
        });
    }
  }

  onNewProducts() {
    this.router.navigateByUrl('/newProduct');
  }

  onUpdate(p: Product) {
    this.router.navigateByUrl('/editProduct/' + p.id);
  }

  onActionEvent($event: ActionEvent){
    //console.log($event);
    switch ($event.type){
      case ProductActionType.GET_ALL_PRODUCTS: this.onGetAllproducts(); break;
      case ProductActionType.GET_SELECTED_PRODUCTS: this.onSelectedProducts(); break;
      case ProductActionType.NEW_PRODUCTS: this.onNewProducts(); break;
      case ProductActionType.GET_AVAILABLE_PRODUCTS: this.onAvailableProducts(); break;
      case ProductActionType.SEARCH_PRODUCTS: this.onSearch($event.payload); break;
      case ProductActionType.SELECT_PRODUCTS: this.onSelect($event.payload); break;
      case ProductActionType.DELETE_PRODUCTS: this.onDelete($event.payload); break;
      case ProductActionType.EDIT_PRODUCTS: this.onUpdate($event.payload); break;
    }
  }
}
