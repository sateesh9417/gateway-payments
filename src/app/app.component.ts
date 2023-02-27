import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './service/auth.service';
// import { NgControl } from '@angular/forms';

declare var Razorpay: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  buttonColor:any = "black";
  buttonType:any = "buy";
  isCustomSize = false;
  buttonWidth = 240;
  buttonHeight = 40;
  isTop = window === window.top;
  myCountry:any;

  showSuccess:any;
  title = 'payment-gateway';
  secret_key = "iZsGpAWWm66PmK5lKFHZw99Y";
  options: any = {
    "key": "rzp_test_8GOqU9yN1v4jcq", // Enter the Key ID generated from the Dashboard 
    "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "USD",
    "name": "DoroNow",
    "description": "Test Transaction",
    "image": "https://cdn.razorpay.com/logos/KowojegjEbbGOY_original.jpg",
    // "name": this.dt?.getUserEmail() ? this.dt?.getUserEmail() : 'Not available username', //paying user name
    // "receipt": "rcptid #11",
    // "image": this.dt?.getDecodeToken('image') ? this.dt?.getDecodeToken('image') : "https://cdn.pixabay.com/photo/2016/08/31/11/55/icon-1633250__340.png",
    // "order_id": "7ccd6f34-1b36-4a44-a185-3762a2748635", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "http://localhost:4200/gift/myGifts",
    // "prefill": {
    //   "name": "Username",
    //   "email": "test@gmail.com",
    //   "contact": "6300580888"
    // },
    "notes": {
      "address": "USA"
    },
    "theme": {
      "hide_topbar" : true,
      "color": "#528FF0"
    },
    "notify": {
      "sms": true,
      "email": true
    },
    "reminder_enable": true,
    "options": {
      "checkout": {
        "name": "DoroNow",
        "method": {
          "netbanking": "0",
          "card": "1",
          "upi": "0",
          "wallet": "0"
        }
      }
    },
    "handler": function (res:any){
      console.log(res);
      alert(res.razorpay_payment_id);
      alert(res.razorpay_order_id);
      alert(res.razorpay_signature)
  },
    "modal": {
      ondismiss: ((res:any) => {
          // add current page routing if payment fails;
          console.log('add current page routing if payment fails');
      })
    }
  };
  paymentHandler: any = null;
  api_key = "pk_test_51M6So2SEBDAvJi4vs1OL9pL8tuMiWgne6m7bqObVjyrbfOQ3pV9AJJhmUF2QJere9T4xpCwf2cS8TMv5oVEBz19q00HFjTVvrx";

  paymentRequest:any = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "VISA", "MASTERCARD"]
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleGatewayMerchantId"
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant"
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "100.00",
      currencyCode: "USD",
      countryCode: "US"
    }
  };

  googlePay(event:any) {
    console.log("load payment data", event.detail);
  }
  form!:FormGroup;
  countrues:any = ['Ind(+91)','US(+1)']
  
constructor( 
  private auth:AuthService,
  private fb:FormBuilder,
  // public ngControl: NgControl
  ) {}

  // @HostListener('ngModelChange', ['$event'])
  // onModelChange(event:any) {
  //   this.onChange(event, false);
  // }

  // @HostListener('keydown.backspace', ['$event'])
  // keydownBackspace(event:any) {
  //   this.onChange(event.target.value, true);
  // }

  ngOnInit(): void {
    this.invokeStripe();
    this.form = this.fb.group({
      phone:['']
    })
  }

  razorPay(){
    new Razorpay(this.options).open();
  }

  stripePay(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.api_key,
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'ItSolutionStuff.com',
      description: '3 widgets',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
  
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.api_key,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
  
      window.document.body.appendChild(script);
    }
  }

  
  // onSelect(data:any){
  //   this.myCountry = data.target.value;
  // }
  // onChange(event:any, backspace:any){
  //   let newVal = event.replace(/\D/g, '');
  //   if (backspace && newVal.length <= 6) {
  //     newVal = newVal.substring(0, newVal.length - 1);
  //   }
  //   if (newVal.length === 0) {
  //     newVal = '';
  //   } else if (newVal.length <= 3) {
  //     newVal = newVal.replace(/^(\d{0,3})/, '($1)');
  //   } else if (newVal.length <= 6) {
  //     newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
  //   } else if (newVal.length <= 10) {
  //     newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
  //   } else {
  //     newVal = newVal.substring(0, 10);
  //     newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
  //   }
  //   this.ngControl.valueAccessor?.writeValue(newVal);
  //   // this.form
  // }


}
