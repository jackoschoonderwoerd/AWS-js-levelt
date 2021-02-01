import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';


import { AppComponent } from './app.component';


import { OrderComponent } from './components/order/order.component';



import { TopNavComponent } from './navigation/top-nav/top-nav.component';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';

import { OrderService } from './components/order/order-services/order.service';
import { CoffeeService } from './components/order/order-item/order-item-services/coffee.service';
import { TeaService } from './components/order/order-item/order-item-services/tea.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { PickupTimeslotsService } from './components/order/order-services/pickup-timeslots.service';

import { FinalizeOrderDialogComponent } from './components/order/dialogs/finalize-order-dialog/finalize-order-dialog.component';
import { FinalizeErrorDialogComponent } from './components/order/dialogs/finalize-error-dialog/finalize-error-dialog.component';
import { OrderMoreDialogComponent } from './components/order/dialogs/order-more-dialog/order-more-dialog.component';

import { HomeComponent } from './components/home/home.component';
import { OrderDirectDialogComponent } from './components/home/order-direct-dialog/order-direct-dialog.component';



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorsComponent } from './components/errorhandling/errors/errors.component';

import { GlobalHttpInterceptorService } from './components/errorhandling/errors/global-http-interceptor.service';
import { OrderItemComponent } from './components/order/order-item/order-item.component';
import { RoutingModule } from './routing.module';
import { OrderitemInfoDialogComponent } from './components/order/dialogs/orderitem-info-dialog/orderitem-info-dialog.component';
import { CancelOrderDialogComponent } from './components/order/dialogs/cancel-order-dialog/cancel-order-dialog.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SingleOrderComponent } from './components/order-table/single-order/single-order.component';












@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    TopNavComponent,
    SideNavComponent,

    FinalizeOrderDialogComponent,
    FinalizeErrorDialogComponent,
    OrderMoreDialogComponent,
    HomeComponent,
    OrderDirectDialogComponent,
    
    ErrorsComponent,
    OrderItemComponent,
    OrderitemInfoDialogComponent,
    CancelOrderDialogComponent,
    OrderTableComponent,
    LoginComponent,
    SingleOrderComponent,
    
    
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    NgbModule
  ],
  providers: [
    CoffeeService,
    TeaService,
    OrderService,
    PickupTimeslotsService,
    
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [

    FinalizeOrderDialogComponent,
    FinalizeErrorDialogComponent,
  ]
})
export class AppModule { }
