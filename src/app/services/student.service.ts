import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  // get("/api/student")
  public getStudents() {
    return this.http.get<any>('/api/student')
    .pipe(map(data => {
        return data;
        }));
  }

  // post("/api/student")
  public postStudents(request:any) {
    return this.http.post<any>('/api/student', request)
    .pipe(map(data => {
        return data;
        }));
  }

  // put("/api/student")
  public updateStudents(id, request:any) {
    return this.http.put('/api/student/' + id, request)
    .pipe(map(data => {
        return data;
        }));
  }

  // delete("/api/student")
  public deleteStudents(id) {
    return this.http.delete('/api/student/' + id)
    .pipe(map(data => {
        return data;
        }));
  }

  // public findStudent(request:any) {
  //   return this.http.get<any>('/find/' + request)
  //   .pipe(map(data => {
  //       return data;
  //       }));
  // }

}
