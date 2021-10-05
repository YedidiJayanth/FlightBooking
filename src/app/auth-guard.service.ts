import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private _Router: Router,
    ) {

    }

    canActivate() {
        if (sessionStorage.getItem("USER_DATA") && localStorage.getItem("USER_DATA"))
            return true;
        else {
            this._Router.navigate(['/login']);
            return false;
        }
    }
}