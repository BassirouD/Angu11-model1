import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionType} from '../../../state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEventEmetter: EventEmitter<ActionEvent> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onGetAllproducts() {
    this.productEventEmetter.emit({type: ProductActionType.GET_ALL_PRODUCTS})
  }

  onSelectedProducts() {
    this.productEventEmetter.emit({type: ProductActionType.GET_SELECTED_PRODUCTS})
  }

  onAvailableProducts() {
    this.productEventEmetter.emit({type: ProductActionType.GET_AVAILABLE_PRODUCTS});
  }

  onNewProducts() {
    this.productEventEmetter.emit({type: ProductActionType.NEW_PRODUCTS})
  }

  onSearch(dataForm: any) {
    this.productEventEmetter.emit({type: ProductActionType.SEARCH_PRODUCTS, payload: dataForm})
  }
}
