import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SingleviewComponent } from './singleview/singleview.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"view/:id",component:SingleviewComponent},
  {path:"cart",component:CartComponent},
  {path:"wishlist",component:WishlistComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"login",component:AuthenticationComponent },
  {path:"signup",component:SignUpComponent},
  {path:'**',redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
