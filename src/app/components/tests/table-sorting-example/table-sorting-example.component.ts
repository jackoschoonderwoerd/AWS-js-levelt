import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

/**
 * @title Table with sorting
 */
@Component({
  selector: 'table-sorting-example',
  styleUrls: ['./table-sorting-example.component.css'],
  templateUrl: './table-sorting-example.component.html',
})
export class TableSortingExampleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    // 'position',
    // 'name',
    'orderInfo',
    'orderId',
    'pickupTime'
    // 'email',
    // 'street'
    // 'weight', 
    // 'symbol'
  ];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  orders;
  users;
  data;
  dataSource;
  

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http: HttpClient
  ) { }

    

  ngOnInit() {
    this.http.get("https://mz1n9q8fi4.execute-api.eu-central-1.amazonaws.com/dev/aws-levelt").subscribe(data =>  {
    // this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(data =>  {
      this.data = data;
      console.log(this.data)
      console.log(this.data.Items[0].orderId)
      this.dataSource = new MatTableDataSource(this.data.Items)
      this.dataSource.sort = this.sort;
    });
    
  }

  ngAfterViewInit() {
  }
}