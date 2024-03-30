import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productService/product.service';
import { Router } from '@angular/router';
import { ToastService } from '../productService/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchData = ""
  allProduts: any = []

  constructor(private ps: ProductService, private rout: Router,private toast:ToastService) { }

  ngOnInit(): void {

    this.ps.searchString.subscribe((data: any) => {
      // console.log(data);

      this.searchData = data

      this.ps.getProducts(this.searchData).subscribe({
        next: (result: any) => {
          this.allProduts = result
        },
        error: (result: any) => {
          this.toast.showError(result)
        }
      })

    })


  }

  isLoggedIn() {
    if (localStorage.getItem("currentUser")) {
      return true
    }
    else {
      return false
    }
  }

  addToWishlist(id: any, title: any, description: any, price: any, category: any, image: any, rating: any) {
    if (this.isLoggedIn()) {
      if (localStorage.getItem("currentUserId")) {
        var userId = localStorage.getItem("currentUserId")
        const bodyData = {
          userId, id, title, description, price, category, image, rating
        }
    
        this.ps.addToWishlist(bodyData).subscribe({
          next: (result: any) => {
            this.toast.showSuccess(result)
          },
          error: (result: any) => {
            this.toast.showError(result.error)
          }
        })
      }

    }
    else {
      this.toast.showWarning('please login first')
      this.rout.navigateByUrl("login")
    }
  }

  addToCart(product:any) {
    if (this.isLoggedIn()) {
      // alert("add to cart work")

      // add quantity=1 in product object
      Object.assign(product,{quantity:1})
      console.log(product);

      this.ps.addToCart(product).subscribe({
        next:(result:any)=>{
          this.ps.updateCartCount()
        this.toast.showSuccess(result)
        },
        error:(result:any)=>{
          this.toast.showError(result)
        }
      })
      
    }
    else {
      this.toast.showWarning('please login first')
      this.rout.navigateByUrl("login")
    }
  }



}
