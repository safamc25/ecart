import { Component } from '@angular/core';
import { ProductService } from '../productService/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../productService/toast.service';

@Component({
  selector: 'app-singleview',
  templateUrl: './singleview.component.html',
  styleUrls: ['./singleview.component.css']
})
export class SingleviewComponent {
  id: any = ""
  singleProduct: any = {}

  constructor(private ps: ProductService, private route: ActivatedRoute, private rout: Router,private toast:ToastService) { }


  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      this.id = data.id
      //  console.log(this.id);

      this.ps.getProduct(this.id).subscribe({
        next: (result: any) => {
          this.singleProduct = result
          console.log(this.singleProduct);

        },
        error: (result: any) => {
          this.toast.showError(result.error.message)
        }
      })

    })

  }

  addToCart(product: any) {
    if (localStorage.getItem("currentUserId")) {
      // alert("add to cart work")

      // add quantity=1 in product object
      Object.assign(product, { quantity: 1 })
      console.log(product);

      this.ps.addToCart(product).subscribe({
        next: (result: any) => {
          this.ps.updateCartCount()

          this.toast.showSuccess(result)
        },
        error: (result: any) => {
          this.toast.showError(result)
        }
      })

    }
    else {
      this.toast.showWarning('please login first')
      this.rout.navigateByUrl("login")
    }
  }

  addToWishlist(id: any, title: any, description: any, price: any, category: any, image: any, rating: any) {

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

  
    else {
  this.toast.showWarning('please login first')
  this.rout.navigateByUrl("login")
}
  }


}

