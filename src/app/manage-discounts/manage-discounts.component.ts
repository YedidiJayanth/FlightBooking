import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AirlinesService } from '../airlines.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-manage-discounts',
  templateUrl: './manage-discounts.component.html',
  styleUrls: ['./manage-discounts.component.css']
})
export class ManageDiscountsComponent implements OnInit {

  constructor(
    private _Router: Router,
    private _AirlinesService: AirlinesService,
    private _ToastrService: ToastrService
  ) { }


  ngOnInit(): void {
    this.getAirlines();
  }

  discountForm: FormGroup = new FormGroup({
    'airlineId': new FormControl(""),
    'flightNumber': new FormControl("",),
    'discountCode': new FormControl("",),
    'discountAmount': new FormControl("",)
  })

  applyDiscount() {
    let self = this;
     
    if (this.discountForm.valid) {
      let data = { 
        "airlineId": this.discountForm.value.airlineId,
        "flightNumber": this.discountForm.value.flightNumber,
        "discountCode": this.discountForm.value.discountCode,
        "discountCost": this.discountForm.value.discountAmount,
      }
      self._AirlinesService.applyDiscount(data).subscribe(
        resp => {
          alert('Discount Applied Successfully');
          if (resp == "Success") {
            self._Router.navigate(['/manage-airlines-view']);
          } else
            alert('Failed to apply');
        }
      );      
    }
  }

  airlineNames: any = []
  getAirlines() {
    let self = this;

    this._AirlinesService.getAirlines().subscribe(
      resp => {
        self.airlineNames = resp
      });
  }

  flightNumbers: any = []
  airlineNameChange(event: any) {
    let self = this;

    debugger
    let id = event.target.value;
    this.discountForm.patchValue({

      'airlineId': id

    })
    this._AirlinesService.getFlightNumbers(id).subscribe(
      resp => {
        self.flightNumbers = resp
      });

  }

  flightNumberChange(event: any) {
    let self = this;

    debugger
    let id = event.target.value;
    this.discountForm.patchValue({

      'flightNumber': id

    })
  }

}