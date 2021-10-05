import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { RouterModule, Routes } from '@angular/router';
import { BookingHistoryComponent } from './booking-history/booking-history.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AirlinesService } from './airlines.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastNoAnimation, ToastNoAnimationModule, ToastrModule, ToastrService } from 'ngx-toastr';
import { ManageAirlinesComponent } from './manage-airlines/manage-airlines.component';
import { ManageAirlinesViewComponent } from './manage-airlines-view/manage-airlines-view.component';
import { ManageSchedulesComponent } from './manage-schedules/manage-schedules.component';
import { ManageDiscountsComponent } from './manage-discounts/manage-discounts.component';
import { PaymentComponent } from './payment/payment.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';
import { CommonModule } from '@angular/common';

const routes: Routes = [

  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, 
  },
  {
    path: 'search', component: SearchComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'registration', component: RegistrationComponent 
  },
  {
    path: 'book-ticket', component: BookTicketComponent,canActivate: [AuthGuardService]
  },
  {
    path: 'booking-history', component: BookingHistoryComponent,canActivate: [AuthGuardService]
  },
  {
    path: 'manage-airlines', component: ManageAirlinesComponent,canActivate: [AuthGuardService]
  },
  {
    path: 'manage-airlines-view', component: ManageAirlinesViewComponent,canActivate: [AuthGuardService]
  },
  {
    path: 'manage-schedules', component: ManageSchedulesComponent,canActivate: [AuthGuardService]
  },
  {
    path: 'manage-discounts', component: ManageDiscountsComponent,canActivate: [AuthGuardService]
  },
  {
    path: 'payment', component: PaymentComponent,canActivate: [AuthGuardService]
  },
  {
    path: 'manage-bookings', component: ManageBookingsComponent,canActivate: [AuthGuardService]
  },

]
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    RegistrationComponent,
    BookTicketComponent,
    BookingHistoryComponent,
    ManageAirlinesComponent,
    ManageAirlinesViewComponent,
    ManageSchedulesComponent,
    ManageDiscountsComponent,
    PaymentComponent,
    HomeComponent,
    ManageBookingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule.forRoot(routes),
    ToastNoAnimationModule,
    ToastrModule.forRoot({
      toastComponent: ToastNoAnimation
    })
  ],
  providers: [AirlinesService, HttpClient, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
