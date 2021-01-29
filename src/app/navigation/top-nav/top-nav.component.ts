import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OverviewService } from 'src/app/components/overview/overview.service';
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
    private router: Router,
    private overviewSerice: OverviewService) {
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
    this.overviewSerice.getLogInStatus();
    // this.username = this.userInfo.username;
    // this.loginStatus = this.userInfo.loginStatus;
    this.overviewSerice.loginStatusChanged.subscribe((userInfo: UserInfo) => {
      this.loginStatus = userInfo.loginStatus;
      this.username = userInfo.username;
    });
  }
  
  onToggleSideNav() {
    this.sideNavToggle.emit();
    console.log('emitted');
  }

  onLogOut() {
    this.overviewSerice.logOut();
  }
  articleSelected(type: string) {
    this.router.navigate(['/order-item', {type: type}])
  }
  routeSelected(selectedRoute) {
    this.router.navigate([selectedRoute]);
  }
  tableSortingExample() {
    this.router.navigate(['table-sorting-example']);
  }
}
