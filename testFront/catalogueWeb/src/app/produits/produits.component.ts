import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  products;
  constructor(private cataloqueService: CatalogueService, private route: ActivatedRoute, private router: Router) {
    router.events.subscribe(event =>{
      if (event instanceof NavigationEnd){
        let url = atob(route.snapshot.params.urlProds);
        this.getProducts(url);
      }
    });
  }

  ngOnInit(): void {
  }

  getProducts(url){
    this.cataloqueService.getRessource(url)
      .subscribe(data =>{
        this.products = data;
      }, error => {console.log(error)})
  }

}
