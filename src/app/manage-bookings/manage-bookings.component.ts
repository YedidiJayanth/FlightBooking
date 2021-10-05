import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { AirlinesService } from '../airlines.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css']
})
export class ManageBookingsComponent implements OnInit {

  USERS:any=[]
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


  data:any
  pdf:boolean=false
  public openPDF(data:any):void {

    this.pdf=true

    this.data = {

        "airlineName": data.airlineName,
        "logo": data.logo,
        "pnr": data.pnr,
        "name": data.name,
        "email": data.email,
        "meal": data.meal,
        "seats": data.seats,
        "flightNumber": data.flightNumber,
        "from": data.from,
        "to": data.to,
        "startDate": data.startDate,
        "endDate": data.endDate,
        "startTime": data.startTime,
        "endTime": data.endTime,
        "cost": data.cost
    }     


    let DATA:any = document.getElementById('htmlData');
        
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('angular-demo.pdf');
        this.pdf=false
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

    cancelTicket(bl:any){
      let self = this;
  
      this._AirlinesService.cancelTicket(bl.bookingId).subscribe(
        resp => {
          alert('Your ticket has been cancelled............. Refund Initiated......')
          self.getBookings(self.id);
        });
    }
}
