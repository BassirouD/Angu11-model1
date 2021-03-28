import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host = 'http://localhost:2020';
  public host2 = 'http://localhost:2021';

  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  getAllCategoties(){
    return this.http.get(this.host+'/categories');
  }

  getAllProducts(){
    return this.http.get(this.host + '/products');
  }

  getRessource(url){
    return this.http.get(url);
  }

  getRessourceUser(url){
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt})
    return this.http.get(url, {headers: headers});
  }

  deleteRessource(url){
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt})
    return this.http.delete(url, {headers: headers});
  }

  postRessource(url, data){
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt})
    return this.http.post(url, data, {headers: headers});
  }

  putRessource(url, data){
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt})
    return this.http.put(url, data, {headers: headers});
  }

  patchRessource(url, data){
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt})
    return this.http.patch(url, data, {headers: headers});
  }

  //--------------------------------------------------------------------------------

  getAllUsers(){
    let headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt})
    return this.http.get(this.host2 + '/appUsers', {headers: headers});
  }

}
