import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { FinalOrder } from 'src/app/models/final-order.model';
import { OverviewService } from './overview.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {


  orders;
  // dateArray = [];
  // selected;



  displayedColumns: string[] = [
    'name',

    'pickupDate',
    'newTime',
    
    'orders',
    'price',
    // 'stamps',
    // 'phone',
  ];
  dataSource = new MatTableDataSource<FinalOrder>();
  // finalOrders: FinalOrder[];
  // selectorForm: FormGroup;

  // dialogRef: MatDialogRef<LoginComponent>;
  // loginStatus: boolean = false;
  // parkedOrders;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(
    private overviewService: OverviewService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) { }
y

  ngOnInit(): void {
    const numbers = [1,2,3]
    this.overviewService.getOrders();
    this.overviewService.ordersChanged.subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
      console.log(orders.length);
      for (let i = 0; i < orders.length; i++) {
        // orders[i].newTime = orders[i].Order.orderInfo.pickupDate.toString();
        orders[i].extractedTimeslot = orders[i].Order.orderInfo.pickupTimeslot;
        orders[i].extractedPickupDate = orders[i].Order.orderInfo.pickupDate;
      }
      console.log(orders);
      
      
      // this.dataSource = this.orders;
      this.dataSource = new MatTableDataSource(orders)
      this.dataSource.sort = this.sort;
    });

    
    // this.dataSource.sortingDataAccessor = (item: FinalOrder, property) => {
    //   switch (property) {
    //     case 'fromDate': return new Date(item.orderInfo.pickupDate);
    //     default: return item[property];
    //   }
    // };
    //   console.log(this.sort);

    //   this.createDates();
    //   this.initForm();

    //   this.loginStatus = this.overviewService.getLogInStatus().loginStatus;

    //   this.overviewService.loginStatusChanged.subscribe((loginStatus: boolean) => {
    //     this.loginStatus = loginStatus;
    //   });
    //   this.overviewService.getLogInStatus();
    //   if (!this.loginStatus) {
    //     console.log('!loginStatus')
    //     this.dialogRef = this.dialog.open(LoginComponent);
    //     this.dialogRef.afterClosed().subscribe(data => {
    //       if (data === 'cancel') {
    //         this.router.navigate(['/home']);
    //       } else {
    //         console.log(data);
    //         this.overviewService.logIn(data);
    //         this.handleFinalOrders()
    //       }
    //     })
    //   } else {
    //     console.log('loginstatus from overview.service.ts');
    //     this.handleFinalOrders();
    //   }
    //   console.log(this.sort);
    // setTimeout(() => {
    //   this.dataSource.sort = this.sort;
    //   alert('sorted')
    // }, 1000);
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // private handleFinalOrders() {
  //   this.overviewService.getOrders();
  //   this.overviewService.ordersChanged.subscribe((finalOrders: FinalOrder[]) => {

  //     this.dataSource.data = finalOrders;
  //     console.log(this.dataSource.data);
  //     this.setSelector();
  //     this.sortByPickupTime();
  //     console.log(this.sort);
  //   });
  // }

  // setSelector() {
  //   const today = this.dateArray[1];
  //   this.selectorForm.get('dateSelector').setValue(today);
  //   this.dataSource.filter = today;
  // }

  // initForm() {
  //   this.selectorForm = this.fb.group({
  //     dateSelector: new FormControl(null, []),
  //     filter: new FormControl(null, [])
  //   });
  // }

  // selectionChange(event) {
  //   console.log(event);
  //   this.dataSource.filter = event.value;
  // }

  // sortByPickupTime() {
  //   console.log(this.sort);
  //   this.dataSource.sort = this.sort;
  //   this.sort.sort({
  //     id: 'pickupTimeslot',
  //     start: 'asc',
  //     disableClear: true
  //   })
  // }

  // doFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  // private createDates() {
  //   this.dateArray.push('');
  //   let startDate: Date = new Date();
  //   const endDate: Date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);
  //   while (startDate < endDate) {
  //     this.dateArray.push(startDate.toDateString());
  //     startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
  //     this.selected = this.dateArray[0];
  //   }
  //   return this.dateArray
  // }
}
