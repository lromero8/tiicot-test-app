import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


// ************************* SERVICES ***********************************
import { StudentService } from '../services/student.service';
// ************************* SERVICES ***********************************


interface Major {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

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
    public dialogRef: MatDialogRef<ModalComponent>,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      major: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]]
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
        this.dialogRef.close();
        this.router.navigate(['/list'], {
          queryParams: {refresh: new Date().getTime()}
        });
        this._snackBar.open('Student Created!', 'Insert', {
          duration: 2000,
          verticalPosition: 'top'
    
        });



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