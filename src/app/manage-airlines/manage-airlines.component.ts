import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AirlinesService } from '../airlines.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-airlines',
  templateUrl: './manage-airlines.component.html',
  styleUrls: ['./manage-airlines.component.css']
})
export class ManageAirlinesComponent implements OnInit {

  logoName:any;
  data:any;

  constructor(
    private _Router: Router,
    private _AirlinesService: AirlinesService,
    private _ToastrService: ToastrService,
  ) { 
  }


  ngOnInit(): void {
   this.data =  sessionStorage.getItem('airline');
   this.data = JSON.parse(this.data);

   if(this.data){
    this.bindVendorInfo(this.data);
   }
  }

  logoFormData: FormData = new FormData();
  
  // @ViewChild('showPic' ,{static:false, read: ElementRef}) ElementReference;
  @ViewChild('showPic', { static: false }) showPic: ElementRef;
  airlinesForm: FormGroup = new FormGroup({
    'id': new FormControl(""),
    'airlineName': new FormControl("",),
    'contactNo': new FormControl("",),
    'address' : new FormControl("",),
    'logo': new FormControl("",)
  })

  bindVendorInfo(data:any) {
    
    this.airlinesForm.patchValue({
      "airlineName": data['airlineName'],
      "contactNo": data['contactNo'],
      "address":data['address']
    });
    if (data['logo'] !== null && this.showPic) {
      let imgElement = '<img  style="width:100px;height:100px" class="img-thumbnail" src="' + 'data:image/jpeg;base64,' + data['logo'] + '" />';
      $(this.showPic.nativeElement).html(imgElement);
    }
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

  fileUpload(files:any) {
    this.logoName = 'Attach Logo';
    let file = files.target.files
    console.log(file[0].name)
    if (file.length !== 0) {
      this.logoFormData = new FormData();
      this.logoFormData.append('file', file[0], file[0].name);
      this.logoName = file[0].name;
      let formats = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    } else {
      let file:any = this.logoFormData.get("file");
      if (file !== null) {
        this.logoName = file['name'];
        this.airlinesForm.controls.logo.setValue([file], { emitModelToViewChange: true })
      }
    }
  }


  addAirline() {
    let self = this;

    
    if (this.airlinesForm.valid) {
      let data = {
        "airlineName": this.airlinesForm.value.airlineName,
        "contactNo": this.airlinesForm.value.contactNo,
        "address": this.airlinesForm.value.address
      }
      self._AirlinesService.addAirline(data, self.logoFormData).subscribe(
        resp => {
             if(resp=="Success"){ 
            alert('Airline Added Successfully');
             self._Router.navigate(['/manage-airlines-view']);
             }else
             alert('Failed to add');     
        }
      );

    }
  }

  getAirlineById() {
    let self = this;

    this._AirlinesService.getAirlines().subscribe(
      resp => {
      });
  }

}
