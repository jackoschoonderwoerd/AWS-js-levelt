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
      localStorage.setItem('orders', JSON.stringify(this.orders));
      this.ordersSubject.next(this.orders)
      return this.orders;
    });
  }

  getOrdersFromService() {
    return new Promise((resolve, reject) => {
      const err = false;
      if(!err) {
        resolve(this.orders)
      } else {
        reject('Error, no orders in service')
      } 
    })
  }
  getOrdersFromLS() {
    return new Promise((resolve, reject) => {
      const err = false;
      if(!err) {
        resolve(JSON.parse(localStorage.getItem('orders')))
      } else {
        reject('no orders in LS')
      }
    })
  }

  getOrdersFromDb() {
    return new Promise((resolve, reject) => {
      const err = false;
      if(!err) {
        resolve('ok')
      } else {
        reject('nok')
      }
    })
  }
 

  getOrderById(orderId) {
    console.log('this.orders');
    if (this.orders) {
      const ordersById = this.orders.filter((order: FinalOrder) => {
        return order.orderId === orderId
      })
      console.log('orders from service');
      return ordersById[0];
    } else if (localStorage.getItem('orders')) {
      this.orders = JSON.parse(localStorage.getItem('orders'));
      const ordersById = this.orders.filter((order: FinalOrder) => {
        return order.orderId === orderId
      })
      console.log('orders from LS');
      return ordersById[0];
    } else {
      this.http.get('https://mz1n9q8fi4.execute-api.eu-central-1.amazonaws.com/dev/aws-levelt').subscribe(data => {
        this.data = data;
        this.orders = this.data.Items;
        console.log('orders from DB', this.orders);
        const ordersById = this.orders.filter((order: FinalOrder) => {
          console.log('orders from BD');
          return order.orderId === orderId
        })
        return ordersById[0];
      })
    } 
  }

  getOrderByIdFromDb(orderId) {
    return new Promise((resolve, reject) => {
      this.http.get('https://mz1n9q8fi4.execute-api.eu-central-1.amazonaws.com/dev/aws-levelt').subscribe(data => {
        const err = false;
        if(!err) {
          resolve(data)
        } else {
          reject('Error, something went wrong')
        }
      })
    })
  }

  

  returnThisOrders() {
    return this.orders
  }
}
