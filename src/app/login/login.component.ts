import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { AirlinesService } from '../airlines.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @ViewChild("loginFormElement") loginFormElement: ElementRef | undefined;
  
  constructor(
    private _Router: Router,
    private _AirlinesService: AirlinesService,
    private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('USER_DATA')){
      this._Router.navigate(['/search'])

    }
    
  }


  loginForm: FormGroup = new FormGroup({
    'id': new FormControl(""),
    'username': new FormControl("",),
    'password': new FormControl("",),
  })

  token:any
  adminPriv : any
  loginUser() {
    let self = this;
    
    if (this.loginForm.valid) {
      let data = {
        "username": this.loginForm.value.username,
        "password": this.loginForm.value.password,
      }

      if(this.loginForm.value.username =="admin" && this.loginForm.value.password=="admin"){
        this.adminPriv = true
        sessionStorage.setItem('admin', this.adminPriv)
      }
     
      self._AirlinesService.loginUser(data).subscribe(
        resp => {
          if(resp){
            resp.token= self.token;
            alert('Login Successfully')
            let data = {
              "username": this.loginForm.value.username,
              "password": this.loginForm.value.password,
            }
            sessionStorage.setItem('USER_DATA', JSON.stringify(data))
            sessionStorage.setItem('TOKEN', resp.token);
            localStorage.setItem('USER_DATA', resp.token);
            self._Router.navigate(['/search']);
            window.location.reload()
          }else{
            alert('Invalid Credentials')
          }
        }
      );

    }
  }

  onRegister(){
    this._Router.navigate(['/registration']);
  }

}
