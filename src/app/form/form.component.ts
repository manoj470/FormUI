import { Component, OnInit,ViewChild,AfterViewInit, Inject, ElementRef } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import * as XLSX from 'xlsx';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  displayedColumns: string[] = ['employeeName', 'dateOfBirth', 'email','gender','hobbies',
                                'address','panNumber','action'];
  dataSource!: MatTableDataSource<any>;
  curPage:number=0;
  pageSize:number=5;
  totalRows!:number;
  slice!:number;
  sliceSlot!:number;
  incrPage:number=0;
  viewData!:any;
  pageNumbers:number[]=[1,2,3];
  sizeList:number[]=[5,10,25,50,100]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,private api:ApiService,
    private router:Router){
    
  }
  ngOnInit(): void {
    this.getAllEmployees();
    this.api.getEmployeeCount().subscribe({
      next:(res)=>{
        console.log("data starts: ");
        console.log(res);
        this.totalRows=res;
        this.slice=Math.ceil(this.totalRows/this.pageSize);
        console.log(this.slice);
        this.sliceSlot=Math.ceil(this.slice/4);
        console.log(this.sliceSlot);
        this.pageNumbers=this.pageNumberT(this.incrPage);
      }
    })
  }

  changeSize(value:any){
    console.log("Clicked............");
    this.pageSize=value;
    this.getAllEmployees();
  }

  previous(){
    console.log("clicked..... previous....");
    this.curPage=this.curPage-1;
    if(((this.curPage+1)%4)==0){
      this.incrPage=this.incrPage-1;
      this.pageNumbers=this.pageNumberT(this.incrPage);
    }
    this.getAllEmployees();
  }

  next(){
    console.log("clicked... next...");
    this.curPage=this.curPage+1;
    console.log(this.curPage+1);
    if(((this.curPage+1)%4)==1){
      this.incrPage=this.incrPage+1;
      this.pageNumbers=this.pageNumberT(this.incrPage);
    }
    this.getAllEmployees();
  }
  first(){
    console.log("clicked....first....");
    this.curPage=0;
    this.incrPage=0;
    this.pageNumbers=this.pageNumberT(this.incrPage);
    // this.tempPage=1;
    this.getAllEmployees();
  }

  last(){
    this.curPage=this.slice-1;
    this.incrPage=this.sliceSlot;
    // if(this.incrPage%4==0){
    //   this.incrPage = this.incrPage-3;
    // }else if(this.incrPage%4==3){
    //   this.incrPage = this.incrPage-2;
    // }else if(this.incrPage%4==2){
    //   this.incrPage = this.incrPage-1;
    // }
    this.pageNumbers=this.pageNumberT(this.incrPage-1);
    this.getAllEmployees();
    console.log("clicked.... last..."+this.curPage+this.pageNumbers);
    // this.page=this.totalRows;
  }

  pageJump(p:number){
    console.log("clicked..... pagejump...."+p);
    this.curPage=p-1;
    this.getAllEmployees();
  }

  pageNumberT(s:number):number[]{
    console.log("Data:   pok");
    console.log(s);
    var v=4*s+1;
    console.log(v);
    return new Array(4).fill(0).map((x,i)=>i+v);
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
    this.api.getDataByPage(this.curPage,this.pageSize)
    .subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        console.log("Data")
        console.log(res);
        // this.dataSource.sort=this.sort;
        // this.dataSource.paginator=this.paginator;
        // console.log("data loaded....");
        // console.log(this.paginator.length);
        // console.log(this.paginator.pageSizeOptions);
        // console.log(this.paginator.pageSize);
        // console.log(this.paginator.showFirstLastButtons);
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

  pageChangeEvent(event: number){
    console.log("Data page : "+event)
    this.curPage = event-1;
    this.getAllEmployees();
  }

  @ViewChild('TABLE') table!: ElementRef;
  exportAsExcel(){
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    ws['!cols'] = [];
    ws['!cols'][7] = {hidden:true};
    // delete ws['6'];
    // delete ws[6];
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Employee.xlsx');
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
