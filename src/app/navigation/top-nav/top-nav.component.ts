
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Event, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';
import { OrderTableService } from 'src/app/components/order-table/order-table.service';
import { OrderService } from 'src/app/components/order/order-services/order.service';

import { UserInfo } from 'src/app/models/user-info.model';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
  
})
export class TopNavComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter<void>();

  isLoggedIn: boolean = false;
  username: string = '';
  mySubscription: any;
  userInfo: UserInfo;
  orderedItemsAmount: number = 0;
  showShoppingCart: boolean = false;
  routeSubscription: Subscription;
  location;
  showOrderTableLink: boolean = false;
  coffeeLinkActive: boolean = false;
  teaLinkActive: boolean = false;
  loginLinkActive: boolean = false;
  orderLinkActive: boolean = false;
  homeLinkActive: boolean = false;


  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private orderTableService: OrderTableService,
    private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
    router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart) {
        if(event.url.includes("/order-table") || event.url.includes('/single-order')) {
          this.showShoppingCart = false;
        } else {
          this.showShoppingCart = true;
        }
        if(event.url.includes('/single-order')) {
          this.showOrderTableLink = true;
        } else {
          this.showOrderTableLink = false;
        }
        if(event.url.includes('type=coffee', 5)) {
          this.teaLinkActive = false
          this.coffeeLinkActive = true;
          this.loginLinkActive = false;
          this.orderLinkActive = false;
          this.homeLinkActive = false;
        }
        if(event.url.includes('type=tea', 5)) {
          this.coffeeLinkActive = false;
          this.teaLinkActive = true;
          this.loginLinkActive = false;
          this.orderLinkActive = false;
          this.homeLinkActive = false;
        }
        if(event.url.includes('login')) {
          this.loginLinkActive = true;
          this.coffeeLinkActive = false;
          this.teaLinkActive = false;
          this.orderLinkActive = false;
          this.homeLinkActive = false;
        }
        if(event.url.includes('order') && event.url.length === 6) {
          this.orderLinkActive = true;
          this.coffeeLinkActive = false;
          this.teaLinkActive = false;
          this.loginLinkActive = false;
          this.homeLinkActive = false;
        }
        if(event.url.includes('home')) {
          this.homeLinkActive = true;
          this.loginLinkActive = false;
          this.coffeeLinkActive = false;
          this.teaLinkActive = false;
          this.orderLinkActive = false;
        }
      }
    })
  }
  private isExactMatch(eventUrl: string, link: string): boolean {
    if(eventUrl.includes(link) && eventUrl.length === link.length) {
      return true;
    } else {
      return false
    }
  }

  ngOnInit() {
    
    this.route.paramMap.subscribe((params: any) => {
    })
    this.authService.loginSubscription.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.orderService.orderedItemsAmountSubject.subscribe((orderedItemsAmount: number) => {
      this.orderedItemsAmount = orderedItemsAmount
    });

  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }


  articleSelected(type: string) {
    this.router.navigate(['/order-item', { type: type }])
  }
  routeSelected(selectedRoute) {
    this.router.navigate([selectedRoute]);
  }
  onOrderTable() {
    this.router.navigate(['order-table']);
  }
  onLogOut() {
    this.authService.logOut();
    localStorage.removeItem('orders');
  }
  
}
