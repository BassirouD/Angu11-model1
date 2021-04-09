import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/products', title: 'products',  icon: 'ni-basket text-red', class: '' },
];


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public menuItems: any[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    // this.router.events.subscribe((event) => {
    // });
  }

}
