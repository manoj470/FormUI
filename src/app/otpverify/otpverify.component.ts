import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOtpInputConfig } from 'ng-otp-input';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-otpverify',
  templateUrl: './otpverify.component.html',
  styleUrls: ['./otpverify.component.css']
})
export class OtpverifyComponent implements OnInit {
  constructor(private api:ApiService,private route:ActivatedRoute,
    private homeRoute:Router) { }
  otp=new FormControl();
  ngOnInit(): void {
  }
    config:NgOtpInputConfig = {
      length:6,
      allowNumbersOnly:true
    };
  
    verify(){
      this.route.queryParams.subscribe({
        next:(data)=>{
          let checkValid ={"email":data["email"],"otp":this.otp.value}
          console.log("#@#@#@##"+checkValid.email+" "+checkValid.otp);
          this.api.postValidate(checkValid)
          .subscribe({
            next:(res)=>{
              console.log("after verify "+res);
              this.homeRoute.navigate([`home`]);
            }
          })
        }
      })
      console.log("clicked")
      console.log(this.otp.value);
      console.log("$$$$$$$$$$$$");
    }
} 
