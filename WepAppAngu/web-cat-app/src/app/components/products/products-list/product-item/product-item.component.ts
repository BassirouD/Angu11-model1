import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../model/product.model';
import {ActionEvent, ProductActionType} from '../../../../state/product.state';
import {EventDriverService} from '../../../../state/event.driver.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  // @Output() eventEmetter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor(private eventDriverService: EventDriverService) { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    // this.eventEmetter.emit({type: ProductActionType.SELECT_PRODUCTS, payload: product});
    this.eventDriverService.publishEvent({type: ProductActionType.SELECT_PRODUCTS, payload: product})
  }

  onDelete(product: Product) {
    // this.eventEmetter.emit({type: ProductActionType.DELETE_PRODUCTS, payload: product});
    this.eventDriverService.publishEvent({type: ProductActionType.DELETE_PRODUCTS, payload: product})
  }

  onEdit(product: Product) {
    // this.eventEmetter.emit({type: ProductActionType.EDIT_PRODUCTS, payload: product});
    this.eventDriverService.publishEvent({type: ProductActionType.EDIT_PRODUCTS, payload: product})
  }
}
