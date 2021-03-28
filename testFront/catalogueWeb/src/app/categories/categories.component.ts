import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories;
  currentCategory;

  constructor(private catalogue: CatalogueService, private route: Router) { }

  ngOnInit(): void {
    this.catalogue.getAllCategoties()
      .subscribe(data=>{
        this.categories = data;
      }, error => console.log(error));
  }

  onGetProducts(cat){
    this.currentCategory = cat;
    let url = cat._links.products.href;
    this.route.navigateByUrl('/products/' + btoa(url));
  }


}
