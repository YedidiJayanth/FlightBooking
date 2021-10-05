import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AirlinesService } from '../airlines.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payment: boolean =true;
  form: boolean = false;
  id:any
  cost:any
  constructor(
    private _Router: Router,
    private _AirlinesService: AirlinesService,
    private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.id= sessionStorage.getItem('ID');
    this.cost= sessionStorage.getItem('cost');
   
  }

  continue(){
    this.payment = false;
    this.form = true;
  }

  paymentForm: FormGroup = new FormGroup({
    'card': new FormControl(""),
    'name': new FormControl("",),
    'month': new FormControl("",),
    'year': new FormControl("",),
    'cvv': new FormControl("",),
    'bookingId': new FormControl("",)
  })


  bookTicket() {
    let self = this;


    if (this.paymentForm.valid) {
      let data = {
        "card": this.paymentForm.value.card,
        "name": this.paymentForm.value.name,
        "month": this.paymentForm.value.month,
        "year": this.paymentForm.value.year,
        "cvv": this.paymentForm.value.cvv,
        "bookingId": this.id,
      }

      self._AirlinesService.payTIcket(data).subscribe(
        resp => {
          if (resp == "Success") {
            alert('Payment Done');
            self._Router.navigate(['/manage-bookings']);
          } else
            alert('Payment Failed')
        }
      );

    }
  }

  ngOnDestroy(){
    sessionStorage.removeItem('cost');
  }

}
