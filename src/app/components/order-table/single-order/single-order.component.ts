import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinalOrder } from 'src/app/models/final-order.model';
import { OrderService } from '../../order/order-services/order.service';
import { OrderTableService } from '../order-table.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit, AfterViewInit {

  order: FinalOrder;
  @ViewChild('printableArea') printableArea

  constructor(
    private route: ActivatedRoute,
    private orderTableService: OrderTableService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId')
    this.order = this.orderTableService.getOrderById(orderId);


  }
  onPrint() {
    const printContents = document.getElementById('printableArea').innerHTML;
    document.body.innerHTML = printContents
    window.print()
    // this.router.navigate(['/order-table', {reload: 'reload'}]);
    // console.log(this.printableArea);
    // document.body.innerHTML = this.printableArea 
    // window.print();
  }
  ngAfterViewInit() {
    this.onPrint();
    this.router.navigate(['/order-table', {reload: 'reload'}]);
  }
}
