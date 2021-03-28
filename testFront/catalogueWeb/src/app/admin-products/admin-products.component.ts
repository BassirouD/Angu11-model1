import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products;
  mode = 'list';
  constructor(private catService: CatalogueService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    return this.catService.getAllProducts()
      .subscribe(data=>{
        this.products = data;
      }, error => {console.log(error);});
  }

  onDeleteProd(prod){
    let conf = confirm('Etes-vous de vouloir supprimer?')
    if (!conf) return;
    return this.catService.deleteRessource(prod._links.self.href)
      .subscribe(data=>{
        this.mode = 'list';
        this.getAllProducts();
      }, error => {console.log(error);});
  }

  currentProd;
  onEditProd(prod){
    this.catService.getRessource(prod._links.self.href)
      .subscribe(data=>{
        this.currentProd = data;
        this.mode = 'edit-prod';
      },error => {
        console.log(error);
      });
  }

  onUpdateProd(data){
    this.catService.patchRessource(data._links.self.href, data)
      .subscribe(data=>{
        this.mode = 'list';
        this.getAllProducts();
      }, error => {console.log(error);});
  }

  onNewProd(){
    this.mode='new-prod';
  }

}
