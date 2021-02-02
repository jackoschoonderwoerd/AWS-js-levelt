import { HttpClient } from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FinalOrder } from 'src/app/models/final-order.model';
import { OrderTableService } from './order-table.service';
import { Location } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



/**
 * @title Table with sorting
 */
@Component({
  selector: 'order-table',
  styleUrls: ['./order-table.component.css'],
  templateUrl: './order-table.component.html',
})
export class OrderTableComponent implements OnInit {
  displayedColumns: string[] = [
    'orderInfo',
    'selectedPickupDate',
    'pickupTime',
    'orders',
    'finalPrice',
    'view'
  ];

  orders :FinalOrder[];
  users;
  data;
  dataSource;
  selectedDefaultValue: number = new Date().setHours(1,0,0,0);
  dateTimestamps: number[] = [];
  routerSubscription: Subscription;
  

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private http: HttpClient,
    private router: Router,
    private orderTableService: OrderTableService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false
    }
    this.routerSubscription = this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    })
  }

  ngOnInit() {
    
    console.log('order-table onInit')
    if (this.route.snapshot.paramMap.get('reload') === 'reload') {
      this.location.go('order-table')
      window.location.reload();
      // this.router.navigate(['/order-table', {reload: 'no-reload'}])
      // console.log('cigar')
    } else if(this.route.snapshot.paramMap.get('reload') === 'no-reload') {
      console.log('no cigar');
      alert('no reload');
      this.router.navigate(['/home']);
    }
     setTimeout(() => {
      this.orderTableService.getOrders();
      this.orderTableService.ordersSubject.subscribe(orders => {
        console.log(orders);
        this.orders = orders
        this.dataSource = new MatTableDataSource(this.orders)
        this.dataSource.sort = this.sort;
        this.doFilter(this.selectedDefaultValue.toString());
        this.dataSource.paginator = this.paginator;
      })
    }); 
    this.setDateTimestamps()
    // this.http.get("https://mz1n9q8fi4.execute-api.eu-central-1.amazonaws.com/dev/aws-levelt").subscribe(data =>  {
    // // this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(data =>  {
    //   this.data = data;
    //   this.orders = this.data.Items;
    //   console.log(this.orders);
    //   this.dataSource = new MatTableDataSource(this.orders)
    //   this.dataSource.sort = this.sort;
    //   this.doFilter(this.selectedDefaultValue.toString());
    //   this.dataSource.paginator = this.paginator;
    // });
  }



  doFilter(filtervalue: string) {
    console.log(filtervalue);
    this.dataSource.filter = filtervalue.toString().trim().toLowerCase();
  }
  private setDateTimestamps() {
    const today = new Date();
    const tenDaysAgo = new Date(today.setDate(today.getDate() -5));
    for (let i = 0; i < 10; i++) {
      this.dateTimestamps.push(new Date(tenDaysAgo.setDate(tenDaysAgo.getDate() + 1)).setHours(1,0,0,0))
    }
    console.log(this.dateTimestamps);
  }
  onPrintOrders() {
    window.print();
  }
  onReload() {
    // console.log('force reload');
    // this.router.navigate(['order-table'])
  }

  getOrderById(orderId) {
    return this.orders.filter((order: FinalOrder) => {
      order.orderId !== orderId
    });
  }

  onView(orderId) {
    // const orderId = (element.orderId)
    this.router.navigate(['/single-order', {orderId}])
  }
}