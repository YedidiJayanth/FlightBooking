import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AirlinesService {

  constructor(private _Http: HttpClient) { }

  registerUser(data: any): Observable<any> {
    return this._Http.post('http://192.168.1.3:9090/airlines/register', data);
  }

  loginUser(data: any): Observable<any> {
    return this._Http.post('http://192.168.1.3:9090/airlines/authenticate', data);
  }

  addAirline(airlines: any, formData: any): Observable<any> {
    formData.delete('airlines');
    formData.append('airlines', new Blob([JSON.stringify({
      airlineName: airlines.airlineName,
      contactNo: airlines.contactNo,
      address: airlines.address
    })], {
      type: "application/json"
    }));
    console.log(formData)
    return this._Http.post('http://192.168.1.3:8081/bookings/airlines/add', formData);
  }

  getAirlines(): Observable<any> {

    return this._Http.post('http://192.168.1.3:8081/bookings/get/airlines', {});

  }

  addInventory(data: any): Observable<any> {

    return this._Http.post('http://192.168.1.3:8081/bookings/inventory/add', data);

  }

  applyDiscount(data: any): Observable<any> {

    return this._Http.post('http://192.168.1.3:8081/bookings/discount/apply', data);

  }

  getFlightNumbers(id: any): Observable<any> {

    return this._Http.post(`http://192.168.1.3:8081/bookings/get/flight/id?id=${id}`, {});

  }

  searchFlights(data: any): Observable<any> {

    return this._Http.post(`http://192.168.1.3:8081/bookings/search/flights`, data);

  }

  getLocations(): Observable<any> {

    return this._Http.post('http://192.168.1.3:8081/bookings/get/locations', {});

  }

  blockAirline(id:any,status:any): Observable<any> {

    return this._Http.post(`http://192.168.1.3:8081/bookings/block/airline?id=${id}&status=${status}`, {});

  }

  payTIcket(data: any): Observable<any> {

    return this._Http.post('http://192.168.1.3:8081/bookings/pay/ticket', data);

  }

  getBookings(id: number): Observable<any> {

    return this._Http.post(`http://192.168.1.3:8081/bookings/manage/bookings?id=${id}`, {});

  }

  bookTicket(data: any): Observable<any> {

    return this._Http.post('http://192.168.1.3:8081/bookings/book/ticket', data);

  }

  cancelTicket(id: any): Observable<any> {

    return this._Http.post(`http://192.168.1.3:8081/bookings/cancel/ticket?id=${id}`, {});

  }

  getUser(name: any): Observable<any> {

    return this._Http.post(`http://192.168.1.3:8081/bookings/get/user?user=${name}`, {});

  }

  getLocalJsonData(): Observable<any> {
    return this._Http.get("assets/project-data.json",{});
}
}
