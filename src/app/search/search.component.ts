import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AirlinesService } from '../airlines.service';
import { ToastrService } from 'ngx-toastr';
declare let $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  dtOptions: any;
  oneWayList: any = [];
  roundTripList: any = [];
  roundTrip: boolean = false;
  disableDate: boolean = false;

  constructor(
    private _Router: Router,
    private _AirlinesService: AirlinesService,
    private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getList();
    this.searchForm.patchValue({
      'to': "Delhi",
      'from': "Hyderabad",
      'startDate': "2021-08-27",
      'endDate': "2021-09-01"
    })
  }

  oneWay() {
    this.disableDate = true;
  }

  round() {
    this.disableDate = false;
  }

  searchForm: FormGroup = new FormGroup({
    'way': new FormControl(""),
    'from': new FormControl("-1",),
    'to': new FormControl("-1",),
    'startDate': new FormControl(""),
    'endDate': new FormControl(""),
  })

  search() {
    let self = this;

    if (this.searchForm.value.way == 1) {
      this.roundTrip = true;
    }

    let data = {
      "endDate": this.searchForm.value.endDate,
      "from": this.searchForm.value.from,
      "startDate": this.searchForm.value.startDate,
      "to": this.searchForm.value.to,
      "way": this.searchForm.value.way
    }

    self._AirlinesService.searchFlights(data).subscribe(
      resp => {
        self.oneWayList = resp['oneWay']
        self.roundTripList = resp['roundTrip']
      }
    );
  }

  fromChange(event: any) {

    let name = event.target.value;
    this.searchForm.patchValue({

      'from': name

    })
  }

  toChange(event: any) {

    let name = event.target.value;
    this.searchForm.patchValue({

      'to': name

    })
  }

  locations: any = []
  getList() {
    let self = this;

    this._AirlinesService.getLocations().subscribe(
      resp => {
        self.locations = resp
      });
  }

  onClick() {
    this._Router.navigate(['book-ticket'])
  }

  onSelectedRow(event: any) {
    sessionStorage.removeItem('booking')
    let sessionData = {
      "id":event['id'],
      "logo": event['logo'],
      "from": event['from'],
      "to": event['to'],
      "startTime": event['startTime'],
      "endTime": event['endTime'],
      "airline": event['airline'],
      "cost": event['cost'],
      "startDate": event['startDate'],
      "endDate": event['endDate'],
      "way": event['way'],
      "discountCode": event['discountCode'],
      "discountAmount": event['discountCost']
    }
    sessionStorage.setItem('booking', JSON.stringify(sessionData));
  }

  onSelectedRoundTripRow(event: any) {
    sessionStorage.removeItem('roundTrip')
    let sessionData = {
      "id":event['id'],
      "logo": event['logo'],
      "from": event['from'],
      "to": event['to'],
      "startTime": event['startTime'],
      "endTime": event['endTime'],
      "airline": event['airline'],
      "cost": event['cost'],
      "startDate": event['startDate'],
      "endDate": event['endDate'],
      "way": event['way'],
      "discountCode": event['discountCode'],
      "discountAmount": event['discountCost']
    }
    
    sessionStorage.setItem('list', JSON.stringify(this.roundTripList));
    sessionStorage.setItem('roundTrip', JSON.stringify(sessionData));
  }
}
