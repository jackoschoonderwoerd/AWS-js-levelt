import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-finalize-error-dialog',
  templateUrl: './finalize-error-dialog.component.html',
  styleUrls: ['./finalize-error-dialog.component.css']
})
export class FinalizeErrorDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public errorMessage: any)  { }

  ngOnInit(): void {
  }

}
