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
 
  // RETUNS AN ORDER: FINALORDER WITH THE GIVVEN ID
  // RETURN FROM SERVICE
  // RETURN FROM LS
  // RETURN FROM DB

  // GET AN ARRAY OF ALL THE ORDERS
  // FILTER THE ARRAY
  // RETURN THE ORDER

  private getArrayOfAllTheOrders(): Promise<FinalOrder[]> {
    console.log('getArrayOfAllTheOrders()')
    return new Promise ((resolve, reject) => {
      if(this.orders) {
        console.log('orders from service')
        resolve(this.orders);
        reject('no orders in service');
      } else if (localStorage.getItem('orders')) {
        console.log('orders from LS');
        resolve(JSON.parse(localStorage.getItem('orders')))
        reject('no orders in LS')
      } else {
        const orders = fetch('https://mz1n9q8fi4.execute-api.eu-central-1.amazonaws.com/dev/aws-levelt')
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          console.log('orders from DB')
          resolve(res.Items);
          reject('no cigar');
        });
      }
    })
  }

  getOrderById(orderId) {
    return new Promise((resolve, reject) => {
      this.getArrayOfAllTheOrders().then((orders: FinalOrder[]) => {
        const orderarr = orders.filter((order: FinalOrder) => {
          return order.orderId === orderId
        });
        resolve(orderarr[0])
        reject((err) => console.error(err));
      });
    })
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
