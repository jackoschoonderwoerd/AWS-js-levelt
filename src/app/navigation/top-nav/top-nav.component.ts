
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
      // console.log(event);
      if(event instanceof NavigationStart) {
        console.log(event.url)
        if(event.url.includes("/order-table") || event.url.includes('/single-order')) {
          this.showShoppingCart = false;
        } else {
          this.showShoppingCart = true;
        }
      }
    })
  }

  ngOnInit() {
    
    console.log('top-nav oninit')
    this.route.paramMap.subscribe((params: any) => {
      console.log('new params');
      console.log(params.get('type'));
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
    console.log('emitted');
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
    this.authService.logOut()
  }
  
}
