import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FinalOrder } from 'src/app/models/final-order.model';
import { OrderService } from '../../order/order-services/order.service';
import { OrderTableService } from '../order-table.service';
import * as jspdf from 'jspdf'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {

  routerSubscription: Subscription
  order;
  @ViewChild('printableArea') printableArea

  constructor(
    private route: ActivatedRoute,
    private orderTableService: OrderTableService,
    private router: Router
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

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId')
    console.log(orderId);
    this.order = this.orderTableService.getOrderById(orderId);
    console.log(this.order);
    // console.log(this.order.orderedItems.length);
    // var doc = new jspdf();

  }
  onPrint() {
    const originalContent = document.body.innerHTML;
    const printableArea = document.getElementById('printableArea').innerHTML;
    // document.body.innerHTML = printableArea
    document.body.innerHTML = `
      <div 
        style="width: 400px; 
        margin-left: auto; 
        margin-right: auto;
        padding: 15px;
        border: 1px solid black">
        ${printableArea}
      </div>`

    window.print()
    window.location.reload()
    // document.body.innerHTML = originalContent;
    // this.router.navigate(['/order-table', {reload: 'reload'}]);
    // this.router.navigate(['/detour', {orderId: this.order.orderId}]);
  }
}
