import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private api:ApiService,
    private router:Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]]
    });
  }



  public forError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
    }
  
  getOtp(){
    this.spinner.show();
    if(this.loginForm.valid){
      this.api.postEmail(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          console.log("clicked successfully!");
          this.router.navigate([`otpverify`],{ queryParams: { email: this.loginForm.value.email }});
        },
        error:()=>{
          alert("Error while sending OTP for this email id");
        }  
      });
    }
  }

}
