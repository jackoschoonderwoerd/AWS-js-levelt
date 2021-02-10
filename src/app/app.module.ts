import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CancelOrderDialogComponent } from './components/order/dialogs/cancel-order-dialog/cancel-order-dialog.component';
import { CoffeeService } from './components/order/order-item/order-item-services/coffee.service';
import { ErrorsComponent } from './components/errorhandling/errors/errors.component';
import { FinalizeErrorDialogComponent } from './components/order/dialogs/finalize-error-dialog/finalize-error-dialog.component';
import { FinalizeOrderDialogComponent } from './components/order/dialogs/finalize-order-dialog/finalize-order-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GlobalHttpInterceptorService } from './components/errorhandling/errors/global-http-interceptor.service';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, Component } from '@angular/core';
import { OrderComponent } from './components/order/order.component';
import { OrderDirectDialogComponent } from './components/home/order-direct-dialog/order-direct-dialog.component';
import { OrderedItemInfoDialogComponent } from './components/order/order-item/ordered-item-info-dialog/ordered-item-info-dialog.component';
import { OrderItemComponent } from './components/order/order-item/order-item.component';
import { OrderitemInfoDialogComponent } from './components/order/dialogs/orderitem-info-dialog/orderitem-info-dialog.component';
import { OrderMoreDialogComponent } from './components/order/dialogs/order-more-dialog/order-more-dialog.component';
import { OrderService } from './components/order/order-services/order.service';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { PickupTimeslotsService } from './components/order/order-services/pickup-timeslots.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { SingleOrderComponent } from './components/order-table/single-order/single-order.component';
import { StampsInfoComponent } from './components/order/dialogs/stamps-info/stamps-info.component';
import { TeaService } from './components/order/order-item/order-item-services/tea.service';
import { TopNavComponent } from './navigation/top-nav/top-nav.component';


@NgModule({
  declarations: [

    AppComponent,
    CancelOrderDialogComponent,
    ErrorsComponent,
    FinalizeErrorDialogComponent,
    FinalizeOrderDialogComponent,
    HomeComponent,
    LoginComponent,
    OrderComponent,
    OrderDirectDialogComponent,
    OrderedItemInfoDialogComponent,
    OrderItemComponent,
    OrderitemInfoDialogComponent,
    OrderMoreDialogComponent,
    OrderTableComponent,
    SingleOrderComponent,
    StampsInfoComponent,
    TopNavComponent,
    
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule,
    RoutingModule,
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
