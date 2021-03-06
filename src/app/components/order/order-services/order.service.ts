import { Injectable, EventEmitter } from '@angular/core';



import { HttpClient } from '@angular/common/http';
import { FinalOrder } from '../../../models/final-order.model';

import { OrderInfo } from '../../../models/order-info.model';
import { OrderedItem } from '../../../models/ordered-item.model';
import { Subject } from 'rxjs';
import { ErrorService } from '../../errorhandling/error.service';
import { Router } from '@angular/router';
import { MyError } from 'src/app/models/my-error.model';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  finalPriceSubject = new Subject<number>();
  finalOrderSubject = new Subject<FinalOrder>();
  orderedItemsAmountSubject = new Subject<number>();
  finalPriceUnderFiveSubject = new Subject<boolean>();

  orderedItems: OrderedItem[] = [];
  ordersChanged = new EventEmitter<OrderedItem[]>();
  finalPriceSubscription = new EventEmitter<number>();
  finalPrice: number = 0;
  finalOrder: FinalOrder
  
  


  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private router: Router) { }

  updateOrderInfo(orderInfoForm: OrderInfo) {
    if(this.finalOrder) {
      this.finalOrder.orderInfo = orderInfoForm
    } else {
      this.finalOrder = new FinalOrder (
        '',
        orderInfoForm,
        [],
        0
      );
      this.router.navigate(['/error'], {state: {error: new Error('there is a problem')}})
    }
    
    this.finalOrder.orderInfo = orderInfoForm;
    
    this.storeFinalOrderInLS();
  }

  deleteOrderedItem(index: number) {
    this.finalOrder.orderedItems.splice(index, 1);
    this.storeFinalOrderInLS();
    this.finalOrderSubject.next(this.finalOrder);
    this.informTopNavOrederedItemsAmount()
    this.calculateFinalPrice()
  }

  deleteOrderedItems() {
    this.orderedItems = [];
    this.ordersChanged.emit(this.orderedItems)
  }
  
  addToOrderedItems(orderedItem: OrderedItem) {
    if(this.finalOrder) {
      this.finalOrder.orderedItems.push(orderedItem);
    } else {
      alert('order-service addToOderedItems');
      this.finalOrder = new FinalOrder(
          '',
          new OrderInfo(null, null, null, null, null, false, null),
          [orderedItem],
          0
        );
    }
    this.informTopNavOrederedItemsAmount()
    this.storeFinalOrderInLS();
  }

  editOrderedItem(orderedItem: OrderedItem, index: number) {
    this.finalOrder.orderedItems[index] = orderedItem;
    this.storeFinalOrderInLS();
  }

  informTopNavOrederedItemsAmount() {
    if(this.finalOrder) {
      this.orderedItemsAmountSubject.next(this.finalOrder.orderedItems.length);
    }
  }


  calculateFinalPrice() {
    this.finalPrice = 0;
    // if(this.finalOrder.orderedItems.length > 0) {
    if(this.finalOrder !== undefined && this.finalOrder !== null) {
      this.finalOrder.orderedItems.forEach((orderedItem: OrderedItem) => {
      this.finalPrice = this.finalPrice + orderedItem.cost;
      });
      this.finalOrder.finalPrice = this.finalPrice;
      this.finalPriceSubject.next(this.finalPrice);
    }
    return this.finalPrice;
  }

  getFinalPrice() {
    return this.finalPrice;
  }

  getOrderedItem(index) {
    return this.finalOrder.orderedItems[index];
  }

  
  getOrderedItems() {
    // if(this.finalOrder.orderedItems !== []) {
      if(this.finalOrder !== undefined && this.finalOrder !== null) {
      return this.finalOrder.orderedItems;
    } else if(localStorage.getItem('finalOrder')) {
      this.orderedItems = JSON.parse(localStorage.getItem('finalOrder')).orderedItems;
      this.calculateFinalPrice();
      this.finalPriceSubscription.emit(this.finalPrice);
      return this.orderedItems;
    } else {
      return [];
    }
  }
  getFinalOrder() {
    if(localStorage.getItem('finalOrder')) {
      this.finalOrder = JSON.parse(localStorage.getItem('finalOrder'));
      return this.finalOrder;
    } else {
      this.finalOrder = new FinalOrder(
        null,
        new OrderInfo(
          null,
          null,
          null,
          null,
          null,
          false,
          null
        ),
        [],
        null,
        null,
        null
      )
    }
    
    return this.finalOrder;
  }
  
  
  postFinalOrder() {
    this.finalOrder.orderInfo.pickupDate = new Date(this.finalOrder.orderInfo.pickupDate).getTime(); 
    this.orderedItems = [];
    
    this.finalOrder.orderInfo.pickupDate = this.compensateDaylightSavingTime(this.finalOrder.orderInfo.pickupDate)
    return this.http.post('https://mz1n9q8fi4.execute-api.eu-central-1.amazonaws.com/dev/aws-levelt', this.finalOrder);
  }

  
  private storeFinalOrderInLS() {
    localStorage.setItem('finalOrder',JSON.stringify(this.finalOrder));
  }

  private clearLocalStorage() {
    localStorage.removeItem('finalOrder');
  }
  private compensateDaylightSavingTime (date: number) {
    const timestamp = new Date(date).getTime();
    const correctedTimestamp = timestamp + 60 * 60 * 1000
    return correctedTimestamp
  }

  clearFinalOrder() {
    this.finalOrder = null;
    this.orderedItemsAmountSubject.next(0);
  }
}
