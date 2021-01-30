
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { UserInfo } from 'src/app/models/user-info.model';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter<void>();

  loginStatus: boolean = false;
  username: string = '';
  mySubscription: any;
  userInfo: UserInfo;


  constructor(
    private router: Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      }
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.router.navigated = false;
        }
      })
    }

  ngOnInit() {
   
  }
  
  onToggleSideNav() {
    this.sideNavToggle.emit();
    console.log('emitted');
  }

 
  articleSelected(type: string) {
    this.router.navigate(['/order-item', {type: type}])
  }
  routeSelected(selectedRoute) {
    this.router.navigate([selectedRoute]);
  }
  onOrderTable() {
    this.router.navigate(['order-table']);
  }
}
