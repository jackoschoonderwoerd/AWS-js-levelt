import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ordered-item-info-dialog',
  templateUrl: './ordered-item-info-dialog.component.html',
  styleUrls: ['./ordered-item-info-dialog.component.css']
})
export class OrderedItemInfoDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public name: string
  ) { }

  ngOnInit(): void {
    console.log(this.name)
  }
}
