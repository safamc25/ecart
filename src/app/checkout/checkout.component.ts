import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { ProductService } from '../productService/product.service';
import { ToastService } from '../productService/toast.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public payPalConfig ? : IPayPalConfig;
  
  checkOut=this.fb.group(
    {
      email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      address:['',[Validators.required]],
      place:['',[Validators.required]],
      phone:['',[Validators.required,Validators.pattern('^[6-9][0-9]{9}')]],
      pin:['',[Validators.required,Validators.pattern('^[6][0-9]{5}')]]



    })
  
    buyStatus:any=false
    totalPrice:any=0
 
  constructor(private fb:FormBuilder,private rout:Router,private ps:ProductService,private toast:ToastService){}


  
  
  ngOnInit(): void {
   if(localStorage.getItem("total")){
    this.totalPrice=localStorage.getItem("total")
   }
  }

  cancel(){
    this.rout.navigateByUrl("/cart")
  }
  proceedToBuy(){
    this.buyStatus=true
   
  }
  cancelPayment(){
    this.buyStatus=false
  }

  payment(){
    this.initConfig();
  }


  // paypal

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: 'this.totalPrice',
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: 'this.totalPrice'
                        }
                    }
                }
               
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            //redirect to home
           
            // empty cart

            this.ps.emptyCart().subscribe({
              next:(result:any)=>{
               alert(result)
              },
              error:(result)=>{
                alert(result.error)
              }
            })
            // cartcount update
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.toast.showWarning('Transaction has been cancelled')

        },
        onError: err => {
            console.log('OnError', err);
           this.toast.showError('Transaction failed.. try after some time')
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
           
        }
    };
}
}


