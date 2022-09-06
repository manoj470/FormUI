import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { OtpverifyComponent } from './otpverify/otpverify.component';

const routes: Routes = [
  {path:'home',component:FormComponent},
  {path:'login',component:LoginComponent},
  {path:'otpverify',component:OtpverifyComponent},
  {path:'details',component:DetailsComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
