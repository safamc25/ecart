import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productService/product.service';
import { ToastService } from '../productService/toast.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  userId: any = ""
  products: any = []

  constructor(private ps: ProductService,private toast:ToastService) { }

  ngOnInit(): void {
    if (localStorage.getItem("currentUserId")) {
      this.userId = localStorage.getItem("currentUserId")
      this.getWishlistData()
    }
  }

  getWishlistData() {
    this.ps.getWishlist(this.userId).subscribe({
      next: (result: any) => {
        this.products = result
        console.log(this.products);

      }
    })
  }

  removeItem(id: any) {
    this.ps.removeWishlist(id).subscribe({
      next: (result: any) => {
        // alert(result)
        this.getWishlistData()

      },
      error: (result: any) => {
        this.toast.showError(result.error)
      }
    })
  }

  addToCart(product: any) {

    // alert("add to cart work")

    // add quantity=1 in product object
    Object.assign(product, { quantity: 1 })
    // console.log(product);

    this.ps.addToCart(product).subscribe({
      next: (result: any) => {
        this.ps.updateCartCount()
        this.removeItem(product._id)
        this.toast.showSuccess(result)
      },
      error: (result: any) => {
        this.toast.showError(result)
      }
    })


  }
}


