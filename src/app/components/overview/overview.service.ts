import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as AWS from 'aws-sdk';
import { FinalOrder } from 'src/app/models/final-order.model';
import { FinalizeOrderDialogComponent } from '../order/dialogs/finalize-order-dialog/finalize-order-dialog.component';
import { Router } from '@angular/router';
import { OrderedItem } from 'src/app/models/ordered-item.model';
import { UserInfo } from 'src/app/models/user-info.model';

@Injectable()
// @Injectable({
//   providedIn: 'root'
// })
export class OverviewService {

  ordersChanged = new EventEmitter<any>();
  loginStatusChanged = new EventEmitter<{}>();
  sortedFinalOrders: FinalOrder[] = [];
  loginStatus: boolean;
  username: string;
  userInfo: UserInfo

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  

  // getOrders() {
  //   console.log('getting orders');
  //   this.http.get('https://mz1n9q8fi4.execute-api.eu-central-1.amazonaws.com/dev/aws-levelt')
  //     .subscribe((data: any) => {
  //       console.log(data.Items);
  //       const finalOrders = [];
  //       data.Items.forEach(item => {
  //         finalOrders.push(AWS.DynamoDB.Converter.unmarshall(item));
  //         console.log(finalOrders);
  //         finalOrders.forEach(finalOrder => {
  //           // console.log(finalOrder);
  //           finalOrder.pickupDate = new Date(finalOrder.pickupDate).toDateString()
  //         });
  //         finalOrders.forEach((finalOrder: FinalOrder) => {
  //           finalOrder.orders.sort(this.compare)
  //         })
  //         this.ordersChanged.emit(finalOrders);
  //       })
  //     })
  // }

  getOrders() {
    console.log('getting orders');
    this.http.get('https://mz1n9q8fi4.execute-api.eu-central-1.amazonaws.com/dev/aws-levelt')
      .subscribe((data: any) => {
        console.log(data);
        const orders = data.Items;
        console.log(orders); 
        this.ordersChanged.emit(orders);
      })
  }
  
  private compare(a, b) {
    let comparison = 0;
    if (a.article > b.article) {
      comparison = 1;
    } else if (a.article < b.article) {
      comparison = -1;
    }
    return comparison;
  }


  logIn(data) {
    if (data.username === 'js' && data.password === 'levelt') {
      this.loginStatus = true;
      this.username = data.username;
      this.loginStatusChanged.emit({ username: this.username, loginStatus: true });
      localStorage.setItem('aws-logged-in', JSON.stringify({loginStatus: this.loginStatus, username: this.username}))
    } else {
      this.loginStatus = false;
      this.loginStatusChanged.emit(false);
      this.router.navigate(['/home']);
    }
  }

  logOut() {
    this.loginStatus = false;
    localStorage.removeItem('aws-logged-in');
    this.loginStatusChanged.emit({ username: '', loginStatus: false });
    this.router.navigate(['/home']);
  }

  getLogInStatus() {
    if(this.loginStatus) {
      this.loginStatusChanged.emit(this.userInfo)
      return this.userInfo;
    } else if (localStorage.getItem('aws-logged-in')) {
      this.userInfo = (JSON.parse(localStorage.getItem('aws-logged-in')));
      this.loginStatus = true;
      this.loginStatusChanged.emit(this.userInfo)
      return this.userInfo
    } else {
      this.userInfo = new UserInfo( '', false);
      return this.userInfo
    }
  }
}
