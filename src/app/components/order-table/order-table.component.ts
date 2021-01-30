import { HttpClient } from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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
    'finalPrice'
  ];

  orders;
  users;
  data;
  dataSource;
  selectedDefaultValue: number = new Date().setHours(1,0,0,0);
  dateTimestamps: number[] = [];
  

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private http: HttpClient
  ) { }

    

  ngOnInit() {
    this.setDateTimestamps()
    this.http.get("https://mz1n9q8fi4.execute-api.eu-central-1.amazonaws.com/dev/aws-levelt").subscribe(data =>  {
    // this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(data =>  {
      this.data = data;
      console.log(this.data)
      console.log(this.data.Items[0].orderId)
      this.dataSource = new MatTableDataSource(this.data.Items)
      this.dataSource.sort = this.sort;
      this.doFilter(this.selectedDefaultValue.toString());
      this.dataSource.paginator = this.paginator;
    });
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
      // this.dateTimestamps.push(new Date(tenDaysAgo.setDate(tenDaysAgo.getDate() + 1)));
    }
    console.log(this.dateTimestamps);
  }
}