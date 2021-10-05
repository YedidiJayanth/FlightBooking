import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'airlines';
  user:any;
  adminPriv: boolean=false;

  constructor(
    private _Router: Router 
  ) {
      if(sessionStorage.getItem('USER_DATA')){
        this.user=true
      }

   }
  
  ngOnInit(): void {
    let data = sessionStorage.getItem('admin');   
      
    if(data){
        this.adminPriv = true 
    }
  }
  
  logOut(){
     sessionStorage.removeItem('USER_DATA');
     sessionStorage.removeItem('admin');
     this._Router.navigate(['login'])  
     setTimeout(() => {
       window.location.reload()
     }, 0);
  }

}
