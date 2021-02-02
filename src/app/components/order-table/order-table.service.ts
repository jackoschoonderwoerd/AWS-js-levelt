import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FinalOrder } from 'src/app/models/final-order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderTableService {

  orders: FinalOrder[];
  data;
  ordersSubject = new Subject<FinalOrder[]>();
  orderById;

  constructor(
    private http: HttpClient
  ) { }

  getOrders() {
    this.http.get("https://mz1n9q8fi4.execute-api.eu-central-1.amazonaws.com/dev/aws-levelt").subscribe(data => {
      // this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(data =>  {
      this.data = data;
      this.orders = this.data.Items;
      console.log(this.orders);
      localStorage.setItem('order', JSON.stringify(this.orders));
      this.ordersSubject.next(this.orders)
      return this.orders;
    });
  }

  getOrderById(orderId) {
    if (this.orders) {
      const ordersById = this.orders.filter((order: FinalOrder) => {
        return order.orderId === orderId
      })
      return ordersById[0];
    } else if (localStorage.getItem('orders')) {
      this.orders = JSON.parse(localStorage.getItem('orders'));
      const ordersById = this.orders.filter((order: FinalOrder) => {
        return order.orderId === orderId
      })
      return ordersById[0];
    } else {
      // this.orders = this.getOrders();
      alert ('no orders found')
    }
  }

  // getOrderById(orderId: string) {
  //   console.log(this.orders);
  //   if(this.orders === undefined) {
  //     if (localStorage.getItem('orders')) {
  //       this.orders = JSON.parse(localStorage.getItem('orders'));
  //     } 
  //     const ordersById = this.orders.filter((order: FinalOrder) => {
  //       return order.orderId === orderId;
  //     });
  //     this.orderById = ordersById[0]
  //     console.log(ordersById[0]);
  //     return ordersById[0];
  //   }
  // }


  returnThisOrders() {
    return this.orders
  }
}
