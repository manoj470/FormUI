import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ApiService } from '../services/api.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,
    private _snackBar: MatSnackBar,private api:ApiService) { }
  id!:number;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns:string[]=['name','size','type','action'];
  dataSource!: MatTableDataSource<any>;
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next:(data)=>{
        this.id=data['id'];
        this.getAllDoc();
      }
    })
  }

  redirect(){
    console.log("redirect to home page...");
    this.router.navigate([`home`]);
  }
  imageSrc:any;
  file:any;
  readURL(event: any): void {
    
    if (event.target.files && event.target.files[0]) {
        this.file = event.target.files[0];
        if(event.target.files[0].size<1048576){
          let details ={"name":event.target.files[0].name,
          "size":event.target.files[0].size,"empId":this.id}
          console.log(details);
          const formData = new FormData();
          formData.append("file",this.file);
          formData.append("details",new Blob([JSON.stringify(details)],
          {type:"application/json"}));
          this.api.postFile(formData).subscribe({
            next:(res)=>{
              this.responseMessage(res.msg);
              this.getAllDoc();
            },
            error:()=>{
              this.responseMessage("failed uploaded...");
            }
          });
        }else{
          this.responseMessage("File size is too large.. It should less than 1MB");
        }
      }
  }
  responseMessage(head:string){
    this._snackBar.open(head,'dismiss',{
      duration:3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  getAllDoc(){
    console.log("Called........ for doc")
    this.api.getFileById(this.id)
    .subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        console.log("Data")
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
        // if(err)
        alert("Error while getting all data!! "+err);
      }
    })
  }

  download(id:number,name:string,type:string){
    this.api.downloadFile(id).subscribe({
      next:(res)=>{
        console.log("Data for download/......")
        saveAs(res, name+'.'+type);
      }
    })
    console.log("clicked... download");
  }
  deleteFile(id:number){
    console.log("clicked delete");
    this.api.deleteDocById(id).subscribe({
      next:(res)=>{
        this.responseMessage(res.msg);
        this.getAllDoc();
      },
      error:(err)=>{
        this.responseMessage("Error in deleting..");
      }
    })
  }
}
