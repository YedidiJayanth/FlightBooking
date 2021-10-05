import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AirlinesService } from '../airlines.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  @ViewChild("registerFormElement") registerFormElement: ElementRef | undefined;
  
  constructor(
    private _Router: Router,
    private _AirlinesService: AirlinesService
  ) { }

  ngOnInit(): void {

  }


  registerForm: FormGroup = new FormGroup({
    'id': new FormControl(""),
    'username': new FormControl("",),
    'password': new FormControl("",),
  })



  onLogin() {
    this._Router.navigate(['/login'])
  }

  registerUser() {
    let self = this;
    debugger
    if (this.registerForm.valid) {
      let data = {
        "username": this.registerForm.value.username,
        "password": this.registerForm.value.password,
      }
      self._AirlinesService.registerUser(data).subscribe(
        resp => {
          alert('Registered Successfully')
          self._Router.navigate(['/login'])
        }
      );

    }
  }

}

