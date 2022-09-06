import { Component, OnInit,ViewChild,AfterViewInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import {MatPaginator} from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // displayedColumns: string[] = ['id', 'employeeName', 'dateOfBirth', 'email','gender','hobbies',
  //                               'addressLine1','addressLine2',
  //                               'zipCode','city','country','panNumber','action'];
  displayedColumns: string[] = ['employeeName', 'dateOfBirth', 'email','gender','hobbies',
                                'address','panNumber','action'];
  dataSource!: MatTableDataSource<any>;
  // view:boolean=false;
  viewData!:any;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,private api:ApiService,
    private router:Router){
    
  }
  ngOnInit(): void {
    this.getAllEmployees();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'40%'
    }).afterClosed().subscribe(()=>{
      this.getAllEmployees();
    });
  }

  getAllEmployees(){
    console.log("Called.........")
    this.api.getData()
    .subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        console.log("Data")
        console.log(res);
        // this.dataSource.sort=this.sort;
        // this.dataSource.paginator=this.paginator;
      },
      error:(err)=>{
        alert("Error while getting all data!! "+err);
      }
    })
  }

  editData(row:any){
    this.dialog.open(DialogComponent,{
      width:'40%',
      data:row
    }).afterClosed().subscribe(()=>{
      this.getAllEmployees();
    });
  }

  deleteData(id:number){
    console.log("Deleting data for: "+id);
    this.api.deleteData(id).subscribe({
      next:(res)=>{
        console.log("Deleted "+res);
        this.getAllEmployees();
      },
      error:(err)=>{
        console.log("error in deleting "+err);
      }
    })
  }

  otherData(id:number){
    this.router.navigate([`details`],{queryParams:{id:id}});
    console.log("clicked on details"+id);
    // this.view = true;
    // this.api.getEmpById(id).subscribe({
    //   next:(res)=>{
        
    //     console.log("Data by api ");
    //     // console.log(res);
    //     this.viewData = res;
    //     console.log("opening comp...");
    //     console.log("new data: "+this.viewData);
    //     this.dialog.open(DetailsComponent,{
    //     width:'30%',
    //     data:this.viewData,
    // }
    // );
    // console.log("ok");
    //   },
    //   error:(err)=>{
    //     console.log("Error while hit api "+err);
    //   }
    // });
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

}
