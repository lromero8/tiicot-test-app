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
    return this.http.get<any>('http://localhost:5000/api/student')
    .pipe(map(data => {
        return data;
        }));
  }

  // post("/api/student")
  public postStudents(request:any) {
    return this.http.post<any>('http://localhost:5000/api/student', request)
    .pipe(map(data => {
        return data;
        }));
  }

  // put("/api/student")
  public updateStudents(id, request:any) {
    return this.http.put('http://localhost:5000/api/student/' + id, request)
    .pipe(map(data => {
        return data;
        }));
  }

  public findStudent(request:any) {
    return this.http.get<any>('/find/' + request)
    .pipe(map(data => {
        return data;
        }));
  }

}
