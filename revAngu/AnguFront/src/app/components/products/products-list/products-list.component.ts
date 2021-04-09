import {Component, Input, OnInit} from '@angular/core';
import {ProductState} from '../../../ngrx/product.reducer';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() state: ProductState | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
