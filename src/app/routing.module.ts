
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ErrorsComponent } from './components/errorhandling/errors/errors.component';
import { HomeComponent } from './components/home/home.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { SingleOrderComponent } from './components/order-table/single-order/single-order.component';
import { OrderItemComponent } from './components/order/order-item/order-item.component';
import { OrderComponent } from './components/order/order.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'order', component: OrderComponent },
  { path: 'error', component: ErrorsComponent },
  { path: 'order-item', component: OrderItemComponent },
  { path: 'order-table', component: OrderTableComponent },
  { path: 'single-order', component: SingleOrderComponent },
  { path: 'login', component: LoginComponent },
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