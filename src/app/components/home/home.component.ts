import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderDirectDialogComponent } from './order-direct-dialog/order-direct-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onOrderDirect(){
    const dialogRef = this.dialog.open(OrderDirectDialogComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe((type: string) => {
      console.log(type);
      if(type === 'cancel' || type === undefined) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['order-item', {type: type}]);
      }
    })
  }
}
