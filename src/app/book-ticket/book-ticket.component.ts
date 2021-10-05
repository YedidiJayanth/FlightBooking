import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AirlinesService } from '../airlines.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  oneWayData: any
  roundTripData: any
  roundTripCard: boolean = false
  logo: any
  from: any
  to: any
  startTime: any
  startDate: any
  endDate: any
  endTime: any
  airline: any
  cost: any
  discountCode:any
  discountCost:any
  roundlogo: any
  roundfrom: any
  roundto: any
  roundstartTime: any
  roundendTime: any
  roundairline: any
  roundcost: any
  roundstartDate: any
  roundendDate: any
  roundDiscountCode:any
  roundDiscountCost:any
  inventoryid:any
  discount:any
  name:any
  list:any
  constructor(
    private _Router: Router,
    private _FormBuilder: FormBuilder,
    private _AirlineService: AirlinesService,
    private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {

    let name :any= sessionStorage.getItem("USER_DATA");
    this.name = JSON.parse(name)
    this.getId()
    this.getSeats()

    this.list = sessionStorage.getItem("list")
    let list = JSON.parse(this.list)



    this.roundTripCard = false
    this.oneWayData = sessionStorage.getItem("booking")
    let sessionData = JSON.parse(this.oneWayData)

    this.logo = sessionData['logo'];
    this.from = sessionData['from']
    this.to = sessionData['to']
    this.startTime = sessionData['startTime']
    this.endTime = sessionData['endTime']
    this.airline = sessionData['airline']
    this.cost = sessionData['cost']
    this.startDate = sessionData['startDate']
    this.endDate = sessionData['endDate']
    this.inventoryid = sessionData['id']
    this.discountCode=sessionData['discountCode'],
    this.discountCost=sessionData['discountAmount']
    if (sessionData['way'] = 1) {
      this.roundTripCard = true
    }

    if(list){

      this.roundTripData = sessionStorage.getItem('roundTrip');
      let sessionData1 = JSON.parse(this.roundTripData)
      
      if (sessionData1['way'] = 1) {
        this.roundTripCard = true
      }
      this.roundlogo = sessionData1['logo'];
      this.roundfrom = sessionData1['from']
      this.roundto = sessionData1['to']
      this.roundstartTime = sessionData1['startTime']
    this.roundendTime = sessionData1['endTime']
    this.roundairline = sessionData1['airline']
    this.roundcost = sessionData1['cost']
    this.roundstartDate = sessionData1['startDate']
    this.roundendDate = sessionData1['endDate']
    this.inventoryid = sessionData['id']
    this.roundDiscountCode=sessionData['discountCode'],
    this.roundDiscountCost=sessionData['discountCost']
    }
    
    this.discount = +(Number(this.discountCost)+ Number(this.roundDiscountCost));

  }

  userId:any
  seats:any=[]
  getId(){
    let self = this;
  
    this._AirlineService.getUser(this.name.username).subscribe(
      resp => {
        
        console.log(resp)
          
          self.userId = resp;

          self.ticketForm.patchValue({
            "id": self.userId
          })
          console.log(self.userId)  
      });
  }

  getSeats(){
    let self = this;
  
    this._AirlineService.getLocalJsonData().subscribe(
      resp => {
          self.seats= resp['seats'] 
      });
  }

  seat(event: any) {
    let self = this;

    debugger
    let name = event.target.value;
    // this.discountForm.patchValue({

    //   'flightNumber': id

    // })
  }

  bookForm: FormGroup = new FormGroup({
    'logo': new FormControl(""),
    'from': new FormControl("",),
    'to': new FormControl("",),
    'startDate': new FormControl(""),
    'endDate': new FormControl(""),
    'airline': new FormControl(""),
    'cost': new FormControl(""),
  })

  ticketForm: FormGroup = new FormGroup({
    'inventoryId': new FormControl(""),
    'to': new FormControl("",),
    'id': new FormControl(""),
    'passengers': new FormControl(""),
    'users': this._FormBuilder.array([]),
  })

  getItemsArray() {
    return this._FormBuilder.group({
      'name': new FormControl(),
      'email': new FormControl(),
      'meal': new FormControl(),
      'seats': new FormControl()
    })
  }

  disableadd:boolean=false
  addUsers() {
    this.pushFormControls()
    let formArray = this.ticketForm.get('users') as FormArray;
    if(formArray.length>=this.ticketForm.value.passengers){
       this.disableadd=true
    }
  }

  get UserControls() {
    return this.ticketForm.get('users') as FormArray;
  }

  pushFormControls() {
    let formArray = this.ticketForm.get('users') as FormArray;
    formArray.push(this.getItemsArray());
  }


  deleteUser() {
    let formArray = this.ticketForm.get('users') as FormArray;
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  bookTicket() {
    let self=this;

    if(this.ticketForm.valid) {

      let usersData = this.saveUsers()

      let data = 
        {
          "inventoryId": this.inventoryid,
          "passengers": this.ticketForm.value.passengers,
          "pnr": this.ticketForm.value.pnr,
          "user": usersData,
          "userId": this.ticketForm.value.id
        } 
      this._AirlineService.bookTicket(data).subscribe(
        resp => {
          if (resp == "Success") {
            alert('Ticket Booked Successfully')
            sessionStorage.setItem('ID',this.userId);
            sessionStorage.setItem('cost',this.cost);
            self._Router.navigate(['payment']);
          } else
            self._ToastrService.error('Failed to apply', 'Fail');
        }
      );
    }
  }

  saveUsers(){
    let formArray:any = this.ticketForm.get('users') as FormArray;
    let List: any = []
    for (let i = 0; i < formArray.length; i++) {
      let data = {
        "email": formArray.get(i.toString()).get('email').value,
        "meal": formArray.get(i.toString()).get('meal').value,
        "name": formArray.get(i.toString()).get('name').value,
        'seats': formArray.get(i.toString()).get('seats').value,
      }
      List.push(data)
    }
    return List
  }

  ngOnDestroy(){
    sessionStorage.removeItem('booking')
    sessionStorage.removeItem('roundTrip')
    sessionStorage.removeItem('list')
  }

  payment() {
    this._Router.navigate(['/payment']);
  }

  // finalCost: number=0
  onDiscountSelect(){
    
    this.cost = Number(this.cost) - Number(this.discountCost);
    
  }
   
  onChange(){
    this.disableadd=false
    this.deleteUser()
  }
}
