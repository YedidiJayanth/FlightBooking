import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AirlinesService } from '../airlines.service';

@Component({
  selector: 'app-manage-airlines-view',
  templateUrl: './manage-airlines-view.component.html',
  styleUrls: ['./manage-airlines-view.component.css']
})
export class ManageAirlinesViewComponent implements OnInit {

  airlinesList: any = []

  constructor(
    private _Router: Router,
    private _AirlinesService: AirlinesService,
    private __ToastrService: ToastrService

  ) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    let self = this;

    this._AirlinesService.getAirlines().subscribe(
      resp => {
        self.airlinesList = resp;
      });
  }

  addAirline(){
    this._Router.navigate(['/manage-airlines'])
  }

  blockAirline(event:any){
    let self = this;

    this._AirlinesService.blockAirline(event.id,0).subscribe(
      resp => {
        if (resp == "Success") {
          this.__ToastrService.success('Airline blocked Successfully', 'Success');
          this.getList()
        } else
          self.__ToastrService.error('Failed to block', 'Fail');
      });
  }

  unblockAirline(event:any){
    let self = this;
 
  this._AirlinesService.blockAirline(event.id,1).subscribe(
    resp => {
      if (resp == "Success") {
        self.__ToastrService.success('Airline Unblocked Successfully', 'Success');
        this.getList()
      } else
        self.__ToastrService.error('Failed to Unblock', 'Fail');
    });
}

  editAirline(event:any){

    let sessionData = {
      "airlineName": event['airlineName'],
      "logo": event['logo'],
      "contactNo": event['contactNo']
    } 
    sessionStorage.setItem('airline', JSON.stringify(sessionData));
    this._Router.navigate(['/manage-airlines'])
  }

  convertToURL(logo:any){
    debugger
    var bytes = logo; // get from server
    var uints :any = new Uint8Array(bytes);
    var base64 = btoa(String.fromCharCode(uints));
    var url = 'data:image/jpeg;base64,' + base64;
    return url;
  }

  b64toBlob(b64Data:any, contentType:any, sliceSize:any) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
}
}
