import { Component, OnInit } from '@angular/core';

// ************************* SERVICES ***********************************
import { StudentService } from '../services/student.service';
// ************************* SERVICES ***********************************

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students = "";
  
  constructor(private studentService: StudentService) {}
  
  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){


    //Consuming service
    this.studentService.getStudents().subscribe(
      data => {

        this.students = JSON.stringify(data);
        console.log(data)


      }, 
      
      error => {   
        console.log(error)
      });
    //Consuming service
  }

}
