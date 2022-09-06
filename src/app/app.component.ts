import { Component, OnInit,ViewChild,AfterViewInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
// import {MatPaginator} from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'empUI2';

  // displayedColumns: string[] = ['id', 'employeeName', 'dateOfBirth', 'email','gender','hobbies',
  //                               'addressLine1','addressLine2',
  //                               'zipCode','city','country','panNumber','action'];
  // dataSource!: MatTableDataSource<any>;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,private api:ApiService
    ){
    
  }
  ngOnInit(): void {
    // this.getAllEmployees();
  }

  // openDialog() {
  //   this.dialog.open(DialogComponent, {
  //     width:'40%'
  //   }).afterClosed().subscribe(()=>{
  //     this.getAllEmployees();
  //   });
  // }

  // getAllEmployees(){
  //   console.log("Called.........")
  //   this.api.getData()
  //   .subscribe({
  //     next:(res)=>{
  //       this.dataSource=new MatTableDataSource(res);
  //       // this.dataSource.sort=this.sort;
  //       // this.dataSource.paginator=this.paginator;
  //     },
  //     error:(err)=>{
  //       alert("Error while getting all data!! "+err);
  //     }
  //   })
  // }

  // editData(row:any){
  //   this.dialog.open(DialogComponent,{
  //     width:'40%',
  //     data:row
  //   }).afterClosed().subscribe(()=>{
  //     this.getAllEmployees();
  //   });
  // }

  // deleteData(id:number){
  //   console.log("Deleting data for: "+id);
  //   this.api.deleteData(id);
  //   console.log("Deleted");
  //   this.getAllEmployees();
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
