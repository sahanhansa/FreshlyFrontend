import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RequestResetComponent } from './pages/request-reset/request-reset.component';
import { VerifyResetComponent } from './pages/verify-reset/verify-reset.component';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentCancelComponent } from './components/payment-cancel/payment-cancel.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    PaymentCancelComponent,
    RequestResetComponent,
    VerifyResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
