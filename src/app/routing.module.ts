
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorsComponent } from './components/errorhandling/errors/errors.component';
import { HomeComponent } from './components/home/home.component';
import { OrderItemComponent } from './components/order/order-item/order-item.component';
import { OrderComponent } from './components/order/order.component';
import { OverviewComponent } from './components/overview/overview.component';






const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin', component: OverviewComponent },
  { path: 'error', component: ErrorsComponent },
  { path: 'order-item', component: OrderItemComponent },
  { path: '**', component: HomeComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule {}