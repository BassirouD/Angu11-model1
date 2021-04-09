import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../model/products.model';
import {Store} from '@ngrx/store';
import {SelectProductAction} from '../../../../ngrx/products.action';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input() product: Product | null = null;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.store.dispatch(new SelectProductAction(product));
  }
}
