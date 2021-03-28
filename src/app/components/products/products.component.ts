import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {AppDataState, DataStateEnum} from '../../state/product.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //---------(1)-----products?: Product[];  // ou products?: Product[]|null=null;
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private prodService: ProductsService, private router:Router) { }

  ngOnInit(): void {
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
    if (!conf) return;
    this.prodService.delete(p)
      .subscribe(data=>{
        this.onGetAllproducts();
      })
  }

  onNewProducts() {
    this.router.navigateByUrl('/newProduct');
  }

  onUpdate(p: Product) {
    this.router.navigateByUrl('/editProduct/' + p.id);
  }
}
