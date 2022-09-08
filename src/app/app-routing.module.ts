import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { OtpverifyComponent } from './otpverify/otpverify.component';
import { AuthGuardServiceService } from './services/auth-guard-service.service';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'home',component:FormComponent,canActivate:[AuthGuardServiceService]},
  {path:'login',component:LoginComponent},
  {path:'otpverify',component:OtpverifyComponent},
  {path:'details',component:DetailsComponent,canActivate:[AuthGuardServiceService]},
  {path:'user',component:UserComponent,canActivate:[AuthGuardServiceService]},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
