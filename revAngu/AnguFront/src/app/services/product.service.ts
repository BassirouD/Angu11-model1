import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/products.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.host;

  constructor(private http: HttpClient) {

  }

  getAllProducts(): Observable<Product[]>{
    let host1 = (Math.random()>0.2)?environment.host:environment.unreachableHost;
    return this.http.get<Product[]>(host1 + '/products');
  }

  getSelectedProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url + '/products?selected=true');
  }

  getAvailableProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.url + '/products?available=true');
  }

  searchProduct(keyword: string): Observable<Product[]>{
    return this.http.get<Product[]>(this.url + '/products?name_like=' + keyword);
  }

  public setSelected(product:Product):Observable<Product>{
    return this.http.put<Product>(environment.host + "/products/" + product.id,
      {...product,selected:!product.selected});
  }

  deleteProduct(product: Product): Observable<void>{
    return this.http.delete<void>(this.url + '/products/' + product.id);
  }

  saveProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.url + '/products', product);
  }

  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(this.url + '/products/' + id)
  }

  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(this.url + '/products/' + product.id, product);
  }

}
