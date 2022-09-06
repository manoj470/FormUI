import { ThisReceiver } from '@angular/compiler';
import { Component, Directive, Inject, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UTF8 } from 'convert-string-bytes';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  clickButton:boolean = false;
  steps:number=1;
  actionBtn:string='Next';
  formTitle:string='Employee Details';
  genderList=["Male","Female","Trans"];
  employeeDetails!:FormGroup;
  familyDetails!:FormGroup;
  uploadData!:FormGroup;
  hobbyList: string[] = ["Reading","Cricket","Football","Listening music"];
  cityList: string[] = ["Mumbai","Pune","Chennai","Kolkata","Bangalore","	Hyderabad","Delhi"];
  relationshipList: string[] = ["Father","Mother","Brother","Sister","Other guardian"];
  countryList: string[] = ["India","Italy","Germany","France","USA","Russia"];
  srcResult: any;
  startDate = new Date(2000, 0, 1);
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private formBuilder:FormBuilder,private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.employeeDetails = this.formBuilder.group({
      employeeName:['',[Validators.required,Validators.maxLength(20)]],
      dateOfBirth:['',[Validators.required,this.datePickerValidator()]],
      email:['',[Validators.required,Validators.email]],
      gender:['',Validators.required],
      hobbies:['',Validators.required],
      addressLine1:['',[Validators.required,Validators.maxLength(50)]],
      addressLine2:['',[Validators.required,Validators.maxLength(50)]],
      zipCode:['',[Validators.required,Validators.pattern('[0-9]{6}')]],
      city:['',Validators.required],
      country:['',Validators.required],
      panNumber:['',[Validators.required,Validators.pattern("[A-Z]{5} || [a-z]{5}[0-9]{4}[A-Z]{1} || [a-z]{1}")]],
      familyDetailsList:[Array<string>],
      avatar:[''],
    });
    this.familyDetails = this.formBuilder.group({
      members:this.formBuilder.array([])
    });

    this.uploadData = this.formBuilder.group({
      avatar:['']
    });
    if(this.editData){

      this.actionBtn='Next';
      this.employeeDetails.controls['employeeName'].setValue(this.editData.employeeName);
      this.employeeDetails.controls['dateOfBirth'].setValue(this.editData.dateOfBirth);
      this.employeeDetails.controls['email'].setValue(this.editData.email);
      this.employeeDetails.controls['gender'].setValue(this.editData.gender);
      this.employeeDetails.controls['hobbies'].setValue(this.editData.hobbies.split(","));
      this.employeeDetails.controls['addressLine1'].setValue(this.editData.addressLine1);
      this.employeeDetails.controls['addressLine2'].setValue(this.editData.addressLine2);
      this.employeeDetails.controls['zipCode'].setValue(this.editData.zipCode);
      this.employeeDetails.controls['city'].setValue(this.editData.city);
      this.employeeDetails.controls['country'].setValue(this.editData.country);
      this.employeeDetails.controls['panNumber'].setValue(this.editData.panNumber);
      this.imageSrc='data:image/jpeg;base64,'+this.editData.avatar;
      this.updateFamilyMembers();
    }
  }
  upload(img:any):any{
    console.log("upload button clicked....");
  }
  submit():any{
    console.log("submit button click....");
  }

  updateMember(index:number): FormGroup {
    return this.formBuilder.group({
      name:[this.editData.familyDetailsList.at(index).name],
      gender:[this.editData.familyDetailsList.at(index).gender],
      relation:[this.editData.familyDetailsList.at(index).relation],
      dateOfBirth:[this.editData.familyDetailsList.at(index).dateOfBirth],
      contactNumber:[this.editData.familyDetailsList.at(index).contactNumber],
    })
  }

  onSave(title:string){
    if(!this.editData){
      if(this.employeeDetails.valid){
        this.employeeDetails.value.hobbies = this.employeeDetails.value.hobbies?.toString();
        this.employeeDetails.value.familyDetailsList = this.members.value;
        const formData = new FormData();
        formData.append("employee",new Blob([JSON.stringify(this.employeeDetails.value)],
          {type:"application/json"}));
        formData.append("file",new Blob([this.file],
        {type:"multipart/form-data"}));
        console.log(this.employeeDetails.value);
        this.api.postData(formData)
        .subscribe({
          next:()=>{
            // alert("Data added successfully!");
            this.responseMessage("Data added successfully!");
            this.employeeDetails.reset();
            this.familyDetails.reset();
            // this.file=null;
            this.dialogRef.close();
            
            // this.stepCount(title);
          },
          error:()=>{
            this.responseMessage("Error while adding data!");
            // alert("Error while adding data!");
          }
        }); 
      }else{
        this.responseMessage("Fields have Invalid Data!");
        // alert("Fields have Invalid Data!");
      }
    }else if(this.steps==2){
      this.updateData(this.editData.id,this.employeeDetails.value);
      console.log("Enter to 2nd condition....");
      // this.stepCount(title);
    }
    // }else if(this.steps==3){
    //   this.employeeDetails.value.familyDetailsList = this.members.value;
    //   this.updateData(this.editData.id,this.employeeDetails.value);
    // }
  }
  // uploadAvatar(id:number){
  //   const formData = new FormData();
  //   console.log("data.........");
  //   console.log(this.file);
  //   if(!(this.file instanceof File)){
  //     console.log("not............")
  //     this.file=new File([this.imageSrc] , "avatar.jpeg", {type: "image/jpeg", lastModified: new Date().getTime()})
  //     return;
  //   }
    
  //   formData.append("file",this.file);
  //   this.api.postAvatar(id,formData).subscribe({
  //     next:()=>{
  //       this.responseMessage("successfully uploaded...");
  //       // console.log("successfully uploaded...");
  //     },
  //     error:()=>{
  //       this.responseMessage("failed uploaded...");
  //       // console.log("failed uploaded...");
  //     }
  //   });
  // }

  updateData(id:number,data:any){
    this.employeeDetails.value.familyDetailsList = this.members.value;
    data.hobbies = data.hobbies?.toString();
    data.avatar = this.imageSrc.split('base64,')[1];
    console.log("data..............");
    console.log(data.avatar);
    this.api.putData(id,data)
    .subscribe({
      next:()=>{
        this.responseMessage("updated successfully!");
        this.employeeDetails.reset();
        this.dialogRef.close();
      },
      error:(err)=>{
        this.responseMessage("Error while updating ");
        // alert("Error while updating "+err);
      }
    })
  }

  responseMessage(head:string){
    this._snackBar.open(head,'dismiss',{
      duration:3 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  

  stepCount(title:string){
    if(title=='form2'){
      console.log(this.imageSrc);
      console.log(this.employeeDetails.value);
      this.steps = this.steps+1;
      this.actionBtn='Save';
      this.formTitle = 'Family Details'
    }else if(title=='form1'){
      console.log(this.imageSrc);
      console.log(this.employeeDetails.value);
      this.actionBtn='Next';
      this.steps = this.steps-1;
      this.formTitle = 'Employee Details'
    }else if(title=='form3'){
      console.log("checkerror1..")
      this.steps = this.steps+1;
      this.actionBtn='Submit';
      this.formTitle = 'Upload Documents'
    }
  }

  get members() : FormArray {
    return this.familyDetails.get("members") as FormArray;
  }

  updateFamilyMembers(){
    for (let index in this.editData.familyDetailsList) {
      this.members.push(this.updateMember(parseInt(index)));
    }
  }

  newMember(): FormGroup {
    return this.formBuilder.group({
      name:[''],
      gender:[''],
      relation:[''],
      dateOfBirth:[''],
      contactNumber:[''],
    })
  }

  addMember() {
    console.log("addmember clicked.....");
    this.members.push(this.newMember());
  }

  removeMember(i:number) {
    console.log("removemember clicked.....");
    this.members.removeAt(i);

  }

  public forError = (controlName: string, errorName: string) =>{
    return this.employeeDetails.controls[controlName].hasError(errorName);
  }

  datePickerValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let forbidden = false;
      if(!this.editData){
        console.log("calling if.....");
        if (control.value) {
          console.log(control.value);
          console.log(control.value.getFullYear())
          if (control.value.getFullYear() > 2000 ) {
            forbidden = true;
            console.log("greater than 2000");
          }
        }
      }else{
        console.log("calling else.....");
        let year = this.editData.dateOfBirth.split('-')[0];
        console.log("year "+year);
        if (year > 2000 ) {
          forbidden = true;
          console.log("greater than 2000");
        }
      }
      return forbidden ? { 'invalidDOBYear': true } : null;
    };
  }

  imageSrc:any;
  file:any;
  readURL(event: any): void {
    
    if (event.target.files && event.target.files[0]) {
        this.file = event.target.files[0];


        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(this.file);
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        console.log(this.imageSrc);
        // console.log(this.file);
    }
    
  }
  
}

