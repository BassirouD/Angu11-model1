import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductActionType} from '../../state/product.state';
import {EventDriverService} from '../../state/event.driver.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId: number;
  productFormGroup: FormGroup;
  submitted: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private prodService: ProductsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private eventDriverService: EventDriverService
              ) {
    this.productId = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.prodService.getProduct(this.productId)
      .subscribe(product=>{
        this.productFormGroup = this.formBuilder.group({
          id: [product.id, Validators.required],
          name: [product.name, Validators.required],
          price: [product.price, Validators.required],
          quantity: [product.quantity, Validators.required],
          selected: [product.selected, Validators.required],
          available: [product.available, Validators.required]
        })
      })
  }

  onUpdateProduct() {
    this.prodService.updateProduct(this.productFormGroup.value)
      .subscribe(data=>{
        this.eventDriverService.publishEvent({type: ProductActionType.PRODUCT_ADDED})
        alert('success product update!!');
        this.router.navigateByUrl('/products');
      })
  }
}
