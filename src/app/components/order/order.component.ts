import { CancelOrderDialogComponent } from './dialogs/cancel-order-dialog/cancel-order-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FinalizeErrorDialogComponent } from './dialogs/finalize-error-dialog/finalize-error-dialog.component';
import { FinalizeOrderDialogComponent } from './dialogs/finalize-order-dialog/finalize-order-dialog.component';
import { FinalOrder } from 'src/app/models/final-order.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrderedItem } from 'src/app/models/ordered-item.model';
import { OrderInfo } from 'src/app/models/order-info.model';
import { OrderitemInfoDialogComponent } from './dialogs/orderitem-info-dialog/orderitem-info-dialog.component';
import { OrderMoreDialogComponent } from './dialogs/order-more-dialog/order-more-dialog.component';
import { OrderService } from 'src/app/components/order/order-services/order.service';
import { PickupTimeslotsService } from 'src/app/components/order/order-services/pickup-timeslots.service';
import { Router } from '@angular/router';
import { StampsInfoComponent } from './dialogs/stamps-info/stamps-info.component';

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
  orderInfo: OrderInfo;
  orderButtonDisabled: boolean = this.orderedItems.length === 0;
  isLoading = false;
  finalOrder: FinalOrder;
  pickupTimeslots;
  selectablePickupDates = [];
  selectedPickupTimeslot: string;
  pickupTimeslot;
  stampsChecked: boolean = false;

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
    if(this.finalOrder !== null) {
      console.log(this.finalOrder.orderInfo);
      this.orderService.finalPriceSubject
        .subscribe((finalPrice: number) => {
          this.finalPrice = finalPrice;
          if (this.finalPrice < 5) {
            this.finalOrder.orderInfo.stamps = false;
            this.orderService.updateOrderInfo(this.finalOrder.orderInfo);
            }
        });
    }
    this.orderService.ordersChanged.subscribe((orderedItems: OrderedItem[]) => {
      this.orderedItems = orderedItems;
    })



    this.orderedItems = this.orderService.getOrderedItems();
    this.initForm();
  }

  onInfo(orderedItem: OrderedItem, index: number) {
    this.dialog.open(OrderitemInfoDialogComponent, { width: "400px", data: { orderedItem: orderedItem, index: index } });
  }

  onDeleteOrderedItem(index: number) {
    this.orderService.deleteOrderedItem(index)
  }

  onEditOrderedItem(index: number) {
    this.router.navigate(['/order-item', { index: index }]);
  }

  orderInfoFormChanged() {
    this.orderService.updateOrderInfo(this.orderInfoForm.value)
  }
  dateChanged(event) {
    this.orderInfoForm.patchValue({
      pickupTimeslot: null
    })
    this.pickupTimeslot = null;
    this.orderInfoFormChanged()
    this.pickupTimeslots = this.pickupTimeslotsService.getTimeslots(new Date(event.value));
    this.finalOrder.orderInfo.pickupTimeslot = null;
    this.orderService.updateOrderInfo(this.orderInfoForm.value);
  }

  timeslotSelected(e) {
    this.orderInfoFormChanged()
  }

  private initForm() {
    this.orderInfoForm = this.fb.group({
      clientName: new FormControl(null, [Validators.required]),
      clientPhone: new FormControl(null, [Validators.required]),
      selectedPickupDate: new FormControl(undefined, [Validators.required]),
      pickupTimeslot: new FormControl(null, [Validators.required]),
      clientEmail: new FormControl(null, [Validators.required]),
      stamps: new FormControl({ value: false, disabled: this.finalPrice < 5 ? true : false })
    });
    if (this.finalOrder) {
      console.log(this.finalOrder);
      this.pickupTimeslots = this.pickupTimeslotsService.getTimeslots(new Date(this.finalOrder.orderInfo.selectedPickupDate));
      this.orderInfoForm.setValue({
        clientName: this.finalOrder.orderInfo.clientName,
        clientEmail: this.finalOrder.orderInfo.clientEmail,
        selectedPickupDate: this.finalOrder.orderInfo.selectedPickupDate,
        pickupTimeslot: this.finalOrder.orderInfo.pickupTimeslot,
        clientPhone: this.finalOrder.orderInfo.clientPhone,
        stamps: this.finalOrder.orderInfo.stamps
      });
      this.orderInfoForm.updateValueAndValidity();
      this.orderService.orderedItemsAmountSubject.next(this.finalOrder.orderedItems.length);
    }
  }

  onSubmitOrderInfoForm() {
    this.isLoading = true;
    this.orderService.postFinalOrder().subscribe(
      (res: any) => {
        if (res.errorMessage) {
          this.isLoading = false;
          this.dialog.open(FinalizeErrorDialogComponent, { data: { errorMessage: res.errorMessage } });
        } else {
          this.isLoading = false;
          this.dialog.open(FinalizeOrderDialogComponent, { width: '400px' });
          this.router.navigate(['/home'])
        }
        // ? CLEAR ORDER
        this.clearOrder();
        this.orderService.orderedItemsAmountSubject.next(0);
      }
    );
  }

  onAddItems(type: string) {
    this.router.navigate(['/order-item', { type: type }]);
  }


  orderMore() {
    const dialogRef = this.dialog.open(OrderMoreDialogComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe((type: string) => {
      this.router.navigate(['/order-item', { type: type }])
    })
  }



  private clearOrder() {
    this.finalOrder = null;
    localStorage.clear()
    this.orderInfoForm.reset();
    this.orderService.deleteOrderedItems();
    this.finalPrice = 0;
    this.orderService.clearFinalOrder();

  }

  onStampsInfo() {
    this.dialog.open(StampsInfoComponent, {
      panelClass: 'stamps-info-dialog',
      maxWidth: '400px'
    });
  }

  myDayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0;
  }

  public onCancel() {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent);
    dialogRef.afterClosed().subscribe((response) => {
      if (response === 'wis') {
        this.clearOrder()
      }
    })
  }

  createSelectablePickupDates() {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const todayDate = today.getDate()
    this.selectablePickupDates = [];
    for (let i = 0; i <= 6; i++) {
      this.selectablePickupDates.push(new Date(today).setDate(todayDate + i));
    }
    // ? TAKE OUT SUNDAYS
    this.selectablePickupDates = this.selectablePickupDates.filter((date) => {
      return new Date(date).getDay() !== 0;
    });

    this.selectablePickupDates = this.selectablePickupDates.map((date: number) => {
      return new Date(date).setHours(1, 0, 0, 0);
    });

    this.selectablePickupDates.forEach(date => {
    })
  }
}



