import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { EventEmitterService } from '../services/event-emitter.service';    

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


// ************************* SERVICES ***********************************
import { StudentService } from '../services/student.service';
// ************************* SERVICES ***********************************



export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

interface Major {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})

export class CreateStudentComponent implements OnInit{

  createForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  selectedValue: string;

  majors: Major[] = [
    {value: 'CCSM', viewValue: 'Child Care Services Management'},
    {value: 'CS', viewValue: 'Computer Science'},
    {value: 'IE', viewValue: 'Industrial Engineering'},
    {value: 'HSA', viewValue: 'Health Services Administration'},
    {value: 'ME', viewValue: 'Medicine'},
    {value: 'PH', viewValue: 'Philosophy'}
  ];



  constructor(

    public dialog: MatDialog,
    private eventEmitterService: EventEmitterService,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router

    ) {

  }
  
  ngOnInit() {
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe((name:string) => {    
        this.openDialog()
      });    
    }

    this.createForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      major: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]]
    });
  }

  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda'
      }
    });
  }

  submit() {
    if (!this.createForm.valid) {
      return;
    }

    // console.log(this.createForm.value);

    //Consuming service
    this.studentService.postStudents(this.createForm.value).subscribe(
      data => {

        console.log(data);
        this.router.navigate(['/list']);


      }, 
      
      error => {   
        console.log(error)
      },
      
      () => {
        // do something when operation successfully complete
      });
    //Consuming service

  }

}


@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

