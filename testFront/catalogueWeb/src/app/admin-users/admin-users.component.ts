import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  appUsers;
  mode='list';
  constructor(private catService: CatalogueService) { }

  ngOnInit(): void {
    this.onGetAllUsers();
  }

  onGetAllUsers(){
    return this.catService.getAllUsers()
      .subscribe(data=>{
        this.appUsers = data;
      }, error => {
        console.log(error);
      });
  }

  onDeleteUser(us){
    let conf = confirm('Etes-vous sur de vouloir supprimer?');
    if (!conf) return;
    this.catService.deleteRessource(us._links.self.href)
      .subscribe(data=>{
        this.onGetAllUsers();
      }, error => {console.log(error)})
  }

  currentUser;
  onEditUser(user){
    this.catService.getRessourceUser(user._links.self.href)
      .subscribe(data=>{
        this.currentUser=data;
        this.mode = 'edit-user'
      },error => {console.log(error);});
  }

  onNewUser(){
    this.mode = 'new-user';
  }

  onSaveUser(data){
    let url = this.catService.host2+'/register';
    this.catService.postRessource(url, data)
      .subscribe(data=>{
        this.mode='list';
        this.onGetAllUsers();
      },error => {console.log(error)})
  }

  onUpdateUser(data){
    this.catService.patchRessource(this.currentUser._links.self.href, data)
      .subscribe(data=>{
        this.mode = 'list';
        this.onGetAllUsers();
      }, error => {console.log(error);});
  }

}
