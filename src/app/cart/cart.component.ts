import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productService/product.service';
import { Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { ToastService } from '../productService/toast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  products: any = []
  totalPrice:any=0

  constructor(private ps: ProductService,private rout:Router,private toast:ToastService) { }
  ngOnInit(): void {
    this.cartItems()

  }
  cartItems(){
  this.ps.getCart().subscribe({
    next: (result: any) => {
      this.products = result
      // console.log(this.products);
      this.getTotalPrice()
      

    }
  })
}

getTotalPrice(){
  if(this.products.length>0){
    this.totalPrice=Math.ceil(this.products.map((i:any)=>i.grandtotal).reduce((a:any,b:any)=>a+b))
    console.log(this.totalPrice);
    
  }
  else{
    this.totalPrice=0
  }
}

  removeItem(id: any) {
    this.ps.removeCart(id).subscribe({
      next: (result: any) => {
       this.toast.showSuccess(result)

        this.cartItems()
        this.ps.updateCartCount()
  
      },
      error: (result: any) => {
        this.toast.showError(result.error)
      }
    })
  
}

incrementCartItem(id:any){
  this.ps.incrementCart(id).subscribe({
    next:(result:any)=>{
      this.toast.showSuccess(result)
      this.cartItems()
    
    }
  })
    
}

decrementCartItem(id:any){
  this.ps.decrementCart(id).subscribe({
    next:(result:any)=>{
      // alert(result)
      this.cartItems()
      this.ps.updateCartCount()
    
    }
    
  })
}

checkOut(){
localStorage.setItem("total",this.totalPrice)
this.rout.navigateByUrl('/checkout')
}
}


