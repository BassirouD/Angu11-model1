import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionType} from '../../../state/product.state';
import {Product} from '../../../model/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  // @Output() productEventEmetter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }
/*
  onSelect(p: Product) {
    this.productEventEmetter.emit({type: ProductActionType.SELECT_PRODUCTS, payload: p});
  }

  onDelete(p: Product) {
    this.productEventEmetter.emit({type: ProductActionType.DELETE_PRODUCTS, payload: p});
  }

  onEdit(p: Product) {
    this.productEventEmetter.emit({type: ProductActionType.EDIT_PRODUCTS, payload: p});
  }

  onActionEvent($event: ActionEvent) {
    this.productEventEmetter.emit($event);
  }

 */

}
