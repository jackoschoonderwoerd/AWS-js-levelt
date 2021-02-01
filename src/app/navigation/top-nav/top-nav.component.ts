
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/components/auth/auth.service';

import { UserInfo } from 'src/app/models/user-info.model';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter<void>();

  isLoggedIn: boolean = false;
  username: string = '';
  mySubscription: any;
  userInfo: UserInfo;


  constructor(
    private router: Router,
    private authService: AuthService) {
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
    this.authService.loginSubscription.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
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
  onLogOut() {
    this.authService.logOut()
  }
}
