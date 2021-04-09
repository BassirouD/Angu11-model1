import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products.service';
import {Router} from '@angular/router';
import {EventDriverService} from '../../state/event.driver.service';
import {ProductActionType} from '../../state/product.state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private prodService: ProductsService,
              private router: Router,
              private eventDriverService: EventDriverService
              ) { }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required],
    });
  }

  onSaveProduct() {
    this.submitted = true;
    if (this.productFormGroup.invalid) return;
    this.prodService.saveProduct(this.productFormGroup.value)
      .subscribe(data=>{
        this.eventDriverService.publishEvent({type: ProductActionType.PRODUCT_UPDATED})
        alert('Success saving !!!');
        this.router.navigateByUrl('/products');
      })
  }
}
