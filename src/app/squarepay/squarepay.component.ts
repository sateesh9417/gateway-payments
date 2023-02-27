//@ts-nocheck
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';

declare var SqPaymentForm : any;
 
@Component({
  selector: 'app-squarepay',
  templateUrl: './squarepay.component.html',
  styleUrls: ['./squarepay.component.css']
})
export class SquarepayComponent implements OnInit, AfterViewInit{

  constructor(private squarePayService : AuthService) { }

  paymentForm:any; 
  status:HTMLElement;
  @ViewChild('card')
  input!: { nativeElement: string | HTMLElement; };

  ngAfterViewInit(){
    this.squarePayService
      .init(
        'sandbox-sq0idb-0DVcMuoRWOozKF_Ppf2JKg',
        'LV9PRRWFKXHCP',
        this.input.nativeElement
      ).then((res:any) => {
        if(res){
          console.log(res,'res');
        }
      }).catch(err => {
       if(err){
        console.log(err,'err');
       }
      })
  }

  ngOnInit(): void {
    this.status = document.getElementById('status');
  }

  payNow(){
    this.squarePayService.tokenize().then((res:any) => {
      console.log(res);
      this.status.innerHTML = "Payment is Successful.";
      this.status.setAttribute('class','my-2 text-success');
    }).catch(err=>{
      console.log(err);
    })
  }
}
