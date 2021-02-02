import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderedItem } from 'src/app/models/ordered-item.model';
import { OrderService } from '../../order-services/order.service';

@Component({
  selector: 'app-orderitem-info-dialog',
  templateUrl: './orderitem-info-dialog.component.html',
  styleUrls: ['./orderitem-info-dialog.component.css']
})
export class OrderitemInfoDialogComponent implements OnInit {

  orderedItem: OrderedItem;
  index: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public dialog: MatDialog,
    public orderService: OrderService
  ) { }

  ngOnInit(): void {
    console.log(this.data.orderedItem);
    this.orderedItem = this.data.orderdItem;
    this.index = this.data.index
  }
  onEdit() {
    this.router.navigate(['/order-item', {editMode: 'true', index: this.data.index}]);
    this.dialog.closeAll();
    
  }
  onDelete() {
    this.orderService.deleteOrderedItem(this.data.index);
    this.dialog.closeAll();
    this.router.navigate(['/order'])
  }
  onClose() {
    this.dialog.closeAll();
  }

}
