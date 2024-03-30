import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../productService/product.service';
import { Router } from '@angular/router';
import { ToastService } from '../productService/toast.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  
  LoginFormModel=this.fb.group(
    {
      email: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]],
      password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]
    })
  
  
   
    constructor(private fb:FormBuilder,private ps:ProductService,private rout:Router,private toast:ToastService){}
  
  ngOnInit(): void {
   
  }

  login(){
    if(this.LoginFormModel.valid){
      var path=this.LoginFormModel.value
      var loginData={
        email:path.email,
        password:path.password
      
        
      }
      this.ps.login(loginData).subscribe({
        next:(result:any)=>{
      //  console.log(result);
      this.toast.showSuccess(`${result.user.username} login successfully`)
      this.LoginFormModel.reset()

      localStorage.setItem("currentUser",result.user.username)
      localStorage.setItem("currentUserId",result.user._id)

      // store token

      localStorage.setItem("token",result.token)
     
      this.rout.navigateByUrl('')
      
       
      },
      error: (result: any) => {
      this.toast.showError(result.error);
       
      }
    })

      
    }
    else{
      this.toast.showWarning('invalid form')
    }

}
}
