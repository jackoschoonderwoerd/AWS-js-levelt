import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-more-dialog',
  templateUrl: './order-more-dialog.component.html',
  styleUrls: ['./order-more-dialog.component.css']
})
export class OrderMoreDialogComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  orderMore(item) {
    if (item === 'coffee') {
      this.router.navigate(['coffee'])
    } else if (item === 'tea') {
      this.router.navigate(['tea']);
    }
  }
}
