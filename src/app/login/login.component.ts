import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthGuardServiceService } from '../services/auth-guard-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide:boolean=true;
  loginForm!:FormGroup;
  emailId!:string;
  constructor(private formBuilder:FormBuilder,private api:ApiService,
    private router:Router,private spinner: NgxSpinnerService,
    private authGuard:AuthGuardServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
    });
    console.log(this.authGuard.isLogin);
  }

  public forError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  
  login(){
    this.spinner.show();
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.api.postLogin(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(">>>>>>>>>>>>>>");
          // console.log(res.headers.get("Set-Cookie"))
          console.log(res);
          console.log(">>>>>>>>>>>>>>");
          alert(res.body.msg);
          this.spinner.hide();
          console.log(this.loginForm.value.email);
          if(res.body.msg=='Login Successfully!'){
            this.emailId=this.loginForm.value.email;
            this.authGuard.isLogin=true;
            this.router.navigate([`user`],{queryParams:{id:res.body.id}});
          }
        },
        error:(err)=>{
          console.log("Error but hit....ok"+err);
          console.log(err)
          this.spinner.hide();
        }
      })
    }


    // if(this.loginForm.valid){
    //   this.api.postEmail(this.loginForm.value)
    //   .subscribe({
    //     next:(res)=>{
    //       console.log("clicked successfully!");
    //       this.router.navigate([`otpverify`],{ queryParams: { email: this.loginForm.value.email }});
    //     },
    //     error:()=>{
    //       alert("Error while sending OTP for this email id");
    //     }  
    //   });
    // }
  }

  admin(){
    console.log("redirect to home page...");
    this.router.navigate([`home`]);

  }
}
