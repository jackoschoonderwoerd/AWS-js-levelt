import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { OrderService } from 'src/app/components/order/order-services/order.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PickupTimeslotsService } from 'src/app/components/order/order-services/pickup-timeslots.service';
import { OrderInfo } from 'src/app/models/order-info.model';
import { MatDialog } from '@angular/material/dialog';
import { FinalizeOrderDialogComponent } from './dialogs/finalize-order-dialog/finalize-order-dialog.component';

import { FinalizeErrorDialogComponent } from './dialogs/finalize-error-dialog/finalize-error-dialog.component';
import { OrderMoreDialogComponent } from './dialogs/order-more-dialog/order-more-dialog.component';
import { Router } from '@angular/router';
import { OrderedItem } from 'src/app/models/ordered-item.model';
import { FinalOrder } from 'src/app/models/final-order.model';

import { OrderDirectDialogComponent } from '../home/order-direct-dialog/order-direct-dialog.component';
import { OrderitemInfoDialogComponent } from './dialogs/orderitem-info-dialog/orderitem-info-dialog.component';
import { CancelOrderDialogComponent } from './dialogs/cancel-order-dialog/cancel-order-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html', 
  styleUrls: ['./order.component.css'],
  
})
export class OrderComponent implements OnInit {
  orderedItems: OrderedItem[] = [];
  finalPrice = 0
  orderInfoForm: FormGroup;
  orderInfoFormValue;
  minDate: Date;
  maxDate: Date;
  afhaalMomenten: string[] = [];
  orderInfo: OrderInfo;
  orderButtonDisabled: boolean = this.orderedItems.length === 0;
  isLoading = false;
  finalOrder: FinalOrder;
  pickupTimeslots;
  selectablePickupDates = [];

  now: string = new Date().toString();

  selectedPickupTimeslot: string;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private pickupTimeslotsService: PickupTimeslotsService,
    private dialog: MatDialog,
    private router: Router) {
      
    }
  ngOnInit(): void {
    this.createSelectablePickupDates();
    this.orderService.finalOrderSubject.subscribe((finalOrder: FinalOrder) => {
      this.finalOrder = finalOrder;
    });
    this.orderService.finalPriceSubject.subscribe((finalPrice: number) => {
      this.finalPrice = finalPrice;
    })
    this.finalOrder = this.orderService.getFinalOrder();
    this.orderService.calculateFinalPrice();
    this.orderService.finalPriceSubscription
      .subscribe((finalPrice: number) => {
      this.finalPrice = finalPrice;
    });
    this.orderService.ordersChanged.subscribe((orderedItems: OrderedItem[]) => {
      this.orderedItems = orderedItems;
    })
    // this.afhaalMomenten = this.pickupTimeslotsService.getTimeslots(this.orderInfoForm.value.pickupDate.setHours());


    this.orderedItems = this.orderService.getOrderedItems();
    const today = new Date()
    this.minDate = today;
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6);
    this.initForm();
  }

  onInfo(orderedItem: OrderedItem, index: number) {
    // this.dialog.open(OrderItemInfoDialogComponent, {data: {orderedItem: orderedItem, index: index}});
    // this.dialog.open(OrderDirectDialogComponent, {data: {orderedItem: orderedItem, index: index}});
    this.dialog.open(OrderitemInfoDialogComponent, {width: "400px", data: {orderedItem: orderedItem, index: index}});
  }

  onDeleteOrderedItem(index: number) {
    this.orderService.deleteOrderedItem(index)
  }

  onEditOrderedItem(index: number) {
    this.router.navigate(['/order-item', {index: index}]);
  }

  orderInfoFormChanged() {
    this.orderService.updateOrderInfo(this.orderInfoForm.value)
  }
  dateChanged(event) {
    this.orderInfoForm.patchValue({
      pickupTimeslot: null
    })
    this.selectedPickupTimeslot = null;
    this.orderInfoFormChanged()
    this.pickupTimeslots = this.pickupTimeslotsService.getTimeslots(new Date(event.value));
    console.log(this.pickupTimeslots);
    this.finalOrder.orderInfo.pickupTimeslot = null;
    this.orderService.updateOrderInfo(this.orderInfoForm.value);
    console.log(this.selectedPickupTimeslot);
  }

  timeslotSelected(e) {
    console.log(e)
    this.orderInfoFormChanged()
  }

  private initForm() {
    this.orderInfoForm = this.fb.group({
      clientName: new FormControl(null, [Validators.required]),
      clientPhone: new FormControl(null, [Validators.required]),
      // pickupDate: new FormControl(undefined, [Validators.required]),
      selectedPickupDate: new FormControl(undefined, [Validators.required]),
      pickupTimeslot: new FormControl(null, [Validators.required]),
      clientEmail: new FormControl(null, [Validators.required]),
      stamps: new FormControl(null, [Validators.required])

      // pickupDate: new FormControl(undefined, [Validators.required]),
      // pickupTimeslot: new FormControl(null, [Validators.required]),
      // stampsRequired: new FormControl(null)
    });
    if(this.finalOrder){
      this.orderInfoForm.setValue({
        clientName: this.finalOrder.orderInfo.clientName,
        clientEmail: this.finalOrder.orderInfo.clientEmail,
        // pickupDate: this.finalOrder.orderInfo.pickupDate,
        selectedPickupDate: this.finalOrder.orderInfo.selectedPickupDate,
        pickupTimeslot: this.finalOrder.orderInfo.pickupTimeslot,
        clientPhone: this.finalOrder.orderInfo.clientPhone,
        stamps: this.finalOrder.orderInfo.stamps
        // pickupDate: this.finalOrder.orderInfo.pickupDate, 
        // pickupTimeslot: this.finalOrder.orderInfo.pickupTimeslot,
        // stamps: this.finalOrder.orderInfo.stamps
      });
      this.orderInfoForm.updateValueAndValidity();
      this.pickupTimeslots = this.pickupTimeslotsService.getTimeslots(new Date(this.finalOrder.orderInfo.selectedPickupDate))
    } 
  }

  onSubmitOrderInfoForm() {
    this.isLoading = true;
    this.orderService.postFinalOrder().subscribe(
      (res: any) => {
        if(res.errorMessage) {
          this.isLoading = false;
          this.dialog.open(FinalizeErrorDialogComponent, {data: {errorMessage: res.errorMessage}});
        } else {
          this.isLoading = false;
          this.dialog.open(FinalizeOrderDialogComponent);
          // this.ClearOrder()
          this.router.navigate(['/home'])
        }
      }
    ); 
  }

  onAddItems(type: string) {
    this.router.navigate(['/order-item', {type: type}]);
  }


  orderMore() {
    const dialogRef =  this.dialog.open(OrderMoreDialogComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe((type: string) => {
      this.router.navigate(['/order-item', {type: type}])
    })
  }

  // sendOrder() {
  //   this.isLoading = true;
  //   this.orderService.postFinalOrder().subscribe(
  //     (res: any) => {
  //       if(res.errorMessage) {
  //         this.isLoading = false;
  //         this.dialog.open(FinalizeErrorDialogComponent, {data: {errorMessage: res.errorMessage}});
  //       } else {
  //         console.log(res);
  //         this.isLoading = false;
  //         this.dialog.open(FinalizeOrderDialogComponent);
  //         // this.ClearOrder()
  //         this.router.navigate(['/home'])
  //       }
  //     }
  //   ); 
  // }

  private clearOrder() {
    this.finalOrder = null;
    localStorage.clear()
    this.orderInfoForm.reset();
    this.orderService.deleteOrderedItems();
    this.finalPrice = 0;
    
  }

  public onCancelOrder() {
    this.clearOrder();
    this.router.navigate(['home']);
  }

  myDayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0;
  }
  public onCancel() {
    const dialogRef =  this.dialog.open(CancelOrderDialogComponent);
    dialogRef.afterClosed().subscribe((response) => {
      if(response === 'wis') {
        this.clearOrder()
      }  
    })
  }

  createSelectablePickupDates() {
    const today = new Date(new Date().setHours(0,0,0,0));
    const todayDate = today.getDate()
    // const startDate = new Date(today.setDate(today.getDate() -5));
    this.selectablePickupDates = [];
    for (let i = 0; i <= 6; i++) {
      // this.selectablePickupDates.push(new Date().setHours(1,0,0,0))
      this.selectablePickupDates.push(new Date(today).setDate(todayDate + i));
    }
    
    this.selectablePickupDates =  this.selectablePickupDates.filter((date) => {
      return new Date(date).getDay() !== 0;
    });
    this.selectablePickupDates = this.selectablePickupDates.map((date: number) => {
      return new Date(date).setHours(1,0,0,0);
    });

    this.selectablePickupDates.forEach(date => {
      console.log(new Date(date));
    })
  }
}



