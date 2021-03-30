import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../model/product.model';
import {ActionEvent, ProductActionType} from '../../../../state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Output() eventEmetter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.eventEmetter.emit({type: ProductActionType.SELECT_PRODUCTS, payload: product});
  }

  onDelete(product: Product) {
    this.eventEmetter.emit({type: ProductActionType.DELETE_PRODUCTS, payload: product});
  }

  onEdit(product: Product) {
    this.eventEmetter.emit({type: ProductActionType.EDIT_PRODUCTS, payload: product});
  }
}
