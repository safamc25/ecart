import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { ProductService } from '../productService/product.service';
import { Router } from '@angular/router';
import { ToastService } from '../productService/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 
 signupModel=this.fb.group(
  {
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
    email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]
  })


 
  constructor(private fb:FormBuilder,private ps:ProductService,private rout:Router,private toast:ToastService){}
 
  ngOnInit(): void {
   
  }
  signup(){
    if(this.signupModel.valid){
      var path=this.signupModel.value
      var userData={
        username:path.username,
        email:path.email,
        password:path.password
      }
      this.ps.signup(userData).subscribe({
        next:(result:any)=>{
      //  console.log(result);
      this.toast.showSuccess(`${result.username} registered successfully`)
      this.signupModel.reset()
      this.rout.navigateByUrl('/login')
      
       
      },
      error: (result: any) => {
      this.toast.showError(result.error);
       
      }
    })


    }
    else{
      this.toast.showWarning("invalid form")
    }
  }

}
