import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories;
  mode = 'list';
  constructor(private catService: CatalogueService) { }

  ngOnInit(): void {
    this.onGetAllCategories()
  }

  onGetAllCategories(){
    this.catService.getAllCategoties()
      .subscribe(data =>{
        this.categories = data;
      }, error => {
        console.log(error)
      });
  }

  onDeleteCat(cat){
    let conf = confirm("Etes vous sur de vouloir supprimer?");
    if (!conf) return;
    return this.catService.deleteRessource(cat._links.self.href)
      .subscribe(data =>{
        this.mode = 'list';
        this.onGetAllCategories();
      }, error => {console.log(error)})
  }

  onNewCat(){
    this.mode = 'new-cat';
  }

  onSaveCat(data){
    //console.log(data);
    let url = this.catService.host+'/categories';
    this.catService.postRessource(url, data)
      .subscribe(data=>{
        this.mode = 'list';
        this.onGetAllCategories();
      }, error => {console.log(error)})
  }

  currentCategory;
  onEditCat(cat){
    this.catService.getRessource(cat._links.self.href)
      .subscribe(data=>{
        this.currentCategory = data;
        this.mode = 'edit-cat';
      },error => {console.log(error)})
  }

  onUpdateCat(data){
    //console.log(data);
    this.catService.putRessource(this.currentCategory._links.self.href, data)
      .subscribe(data=>{
        this.mode = 'list';
        this.onGetAllCategories();
      }, error => {console.log(error)})
  }


}
