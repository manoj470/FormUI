import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // headers = new HttpHeaders({
  //   mode: 'no-cors'
  // });
  constructor(private http:HttpClient) { }

  postData(data:any){
    return this.http.post<any>("http://localhost:8080/emp/add_new",data);
    // return this.http.post<any>("http://localhost:8080/emp/test",data);
  }

  getData(){
    return this.http.get<any>("http://localhost:8080/emp");
  }

  putData(id:number,data:any){
    return this.http.put<any>("http://localhost:8080/emp/edit/"+id,data)
  }

  deleteData(id:number){
    return this.http.delete<any>("http://localhost:8080/emp/delete/"+id)
  }
  
  postEmail(data:any){
    return this.http.post<any>("http://localhost:5000/user/sendOtp",data);
  }

  postValidate(data:any){
    return this.http.post<any>("http://localhost:5000/user/validateOtp",data);
  }

  getEmpById(id:number){
    return this.http.get<any>("http://localhost:8080/emp/show_by_id/"+id);
  }

  postAvatar(id:number,data:any){
    return this.http.post<any>("http://localhost:8080/emp/upload/"+id+"/avatar/",data);
  }
}
