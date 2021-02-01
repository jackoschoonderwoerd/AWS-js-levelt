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

  constructor(
    private http: HttpClient
  ) { }

  getOrders() {
    this.http.get("https://mz1n9q8fi4.execute-api.eu-central-1.amazonaws.com/dev/aws-levelt").subscribe(data =>  {
    // this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(data =>  {
      this.data = data;
      this.orders = this.data.Items;
      this.ordersSubject.next(this.orders)
      return this.orders;
    });
  }
  getOrderById(orderId: string): FinalOrder {
    const orders =  this.orders.filter((order: FinalOrder) => {
      return order.orderId === orderId;
    });
    return orders[0];
  }
}
