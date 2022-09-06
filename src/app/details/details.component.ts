import { style } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public viewData:any
  toggle!: string;
  isSuccess:boolean=false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private route:ActivatedRoute,private api:ApiService,
    private _formBuilder: FormBuilder,private _snackBar: MatSnackBar) { }
  public url:any;
  public anchorList:string[]=['Employee','Family','Documents','Others']

  ngOnInit(): void {
    console.log("open component...");
    this.route.queryParams.subscribe({
      next:(par)=>{
        console.log("data");
        console.log(par["id"]);
        this.api.getEmpById(par["id"]).subscribe({
          next:(res)=>{
            this.isSuccess=true;
            console.log(res);
            this.viewData=res;
            this.toggle=this.anchorList[0];
            console.log(this.viewData.avatar);
            if(this.viewData.avatar != null){
              this.url = 'data:image/jpeg;base64,' + this.viewData.avatar;
            }
            // var uints = new Uint8Array(bytes);
            // var base64 = btoa(String.fromCharCode(null, uints));
            
          }
        })
      },
      error:(err)=>{
        console.log("error in data: "+err);
      }
    })
  }

  details(actionOn:string):any{
    console.log("for details....."+actionOn);
    this.toggle=actionOn;
  }

  readURL(event: any): void {
    let file:any;
    if (event.target.files && event.target.files[0]) {
        file = event.target.files[0];
        // this.name = event.target.files[0].name;

        const reader = new FileReader();
        reader.onload = e => this.url = reader.result;

        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append("file",file);
        this.api.postAvatar(this.viewData.id,formData).subscribe({
          next:()=>{
            this.responseMessage("successfully uploaded...");
            // console.log("successfully uploaded...");
          },
          error:()=>{
            this.responseMessage("failed uploaded...");
            // console.log("failed uploaded...");
          }
        });
        // console.log(this.imageSrc);
        // console.log(this.file);
    }
    
  }

  responseMessage(head:string){
    this._snackBar.open(head,'dismiss',{
      duration:3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
