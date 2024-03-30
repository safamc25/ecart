import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BaseUrl = 'https://ecartserver-jpmd.onrender.com'

  searchString = new BehaviorSubject("")
  cartCount=new BehaviorSubject(0)

  constructor(private http: HttpClient) {
    this.updateCartCount()
   }


  updateCartCount(){
    this.getCart().subscribe({
      next:(result:any)=>{
        this.cartCount.next(result.length)
      }
    })
  }

  // api to get all products
  getProducts(searchData: any) {
    return this.http.get(`${this.BaseUrl}/get-all-products?search=${searchData}`)
  }

  // api to get single products
  getProduct(id: any) {
    return this.http.get(`${this.BaseUrl}/get-product/${id}`)
  }

  // signup
  signup(bodyData: any) {
    return this.http.post(`${this.BaseUrl}/add-new-user`, bodyData)
  }

  
  // login
  login(bodyData: any) {
    return this.http.post(`${this.BaseUrl}/login`, bodyData)
  }

  // method to create header
    accessTokenHeader(){
      var headers=new HttpHeaders()
      if(localStorage.getItem("token")){
        const token=localStorage.getItem("token")
        var headers=headers.append('access_token',`Bearer ${token}`)
      }
      return {headers}
    }

   // add to wishlist
   addToWishlist(bodyData: any) {
    return this.http.post(`${this.BaseUrl}/user/add-to-wishlist`, bodyData,this.accessTokenHeader())
  }

   // view to wishlist
   getWishlist(userId: any) {
    return this.http.get(`${this.BaseUrl}/user/get-Wishlist/${userId}`,this.accessTokenHeader())
  }

  removeWishlist(itemId: any) {
    return this.http.delete(`${this.BaseUrl}/user/remove-wishlist/${itemId}`,this.accessTokenHeader())
  }

  addToCart(bodyData: any) {
    return this.http.post(`${this.BaseUrl}/user/add-to-cart`, bodyData,this.accessTokenHeader())
  }

  getCart() {
    return this.http.get(`${this.BaseUrl}/user/get-cart`,this.accessTokenHeader())
  }

  removeCart(itemId: any) {
    return this.http.delete(`${this.BaseUrl}/user/remove-cart/${itemId}`,this.accessTokenHeader())
  }

  incrementCart(itemId: any) {
    return this.http.get(`${this.BaseUrl}/user/increment-cart/${itemId}`,this.accessTokenHeader())
  }

  decrementCart(itemId: any) {
    return this.http.get(`${this.BaseUrl}/user/decrement-cart/${itemId}`,this.accessTokenHeader())
  }

  emptyCart() {
    return this.http.delete(`${this.BaseUrl}/user/remove-cart`,this.accessTokenHeader())
  }

}
