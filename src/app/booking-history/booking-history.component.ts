import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AirlinesService } from '../airlines.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  dtOptions: any;
  airlinesList: any = [];
  name:any
  id:any
  constructor(

    private _Router: Router,
    private _AirlinesService: AirlinesService,
    private __ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    let name :any= sessionStorage.getItem("USER_DATA");
    this.name = JSON.parse(name)
    this.getId()
  }

  getId(){
    let self = this;
  
    this._AirlinesService.getUser(this.name.username).subscribe(
      resp => {
        
        console.log(resp)
          
          self.id = resp;
          console.log(self.id)  
          self.getBookings(self.id)
      });
  }

  bookingsList:any=[]
  getBookings(id :any) {
    let self = this;

    this._AirlinesService.getBookings(id).subscribe(
      resp => {
        self.bookingsList = resp;
      });
  }

}
