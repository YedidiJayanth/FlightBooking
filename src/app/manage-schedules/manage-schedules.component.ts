import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AirlinesService } from '../airlines.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-schedules',
  templateUrl: './manage-schedules.component.html',
  styleUrls: ['./manage-schedules.component.css']
})
export class ManageSchedulesComponent implements OnInit {

  constructor(
    private _Router: Router,
    private _AirlinesService: AirlinesService,
    private _ToastrService: ToastrService
  ) { }


  ngOnInit(): void {
    this.getAirlines();
  }

  inventoryForm: FormGroup = new FormGroup({
    'id': new FormControl(""),
    'airlineId': new FormControl("-1"),
    'flightNumber': new FormControl("",),
    'airline': new FormControl("",),
    'from': new FormControl("",),
    'to': new FormControl("",),
    'startDate': new FormControl(""),
    'endDate': new FormControl(""),
    'startTime': new FormControl(""),
    'endTime': new FormControl(""),
    'instrument': new FormControl("",),
    'businessSeats': new FormControl("",),
    'cost': new FormControl("",),
    'meal': new FormControl("",)
  })

  addInventory() {
    let self = this;


    if (this.inventoryForm.valid) {
      let data = {
        "airlineId": this.inventoryForm.value.airlineId,
        "flightNumber": this.inventoryForm.value.flightNumber,
        "from": this.inventoryForm.value.from,
        "to": this.inventoryForm.value.to,
        "startDate": this.inventoryForm.value.startDate,
        "endDate": this.inventoryForm.value.endDate,
        "startTime": this.inventoryForm.value.startTime,
        "endTime": this.inventoryForm.value.endTime,
        "instrument": this.inventoryForm.value.instrument,
        "businessSeats": this.inventoryForm.value.businessSeats,
        "cost": this.inventoryForm.value.cost,
        "meal": this.inventoryForm.value.meal = "yes" ? "1" : "0",
      }
      self._AirlinesService.addInventory(data).subscribe(
        resp => {
          if (resp == "Success") {
            alert('Inventory Added Successfully');
            self._Router.navigate(['/manage-airlines-view']);
          } else
            alert('Failed to add');
        }
      );

    }
  }

  airlineNames: any=[]
  getAirlines() {
    let self = this;

    this._AirlinesService.getAirlines().subscribe(
      resp => {
        self.airlineNames = resp
      });
  }

  airlineNameChange(event:any){
     let id = event.target.value;
     this.inventoryForm.patchValue({

        'airlineId' : id

     }) 
  }


}
