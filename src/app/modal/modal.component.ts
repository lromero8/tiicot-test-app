import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

interface DialogData {
  edit: Boolean,
  email: string,
  firstName: string,
  lastName: string,
  major: string,
  _v: Number,
  _id: string
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
    {value: 'PH', viewValue: 'Philosophy'},
    {value: 'MK', viewValue: 'Marketing'},
    {value: 'BU', viewValue: 'Business'}
  ];
  

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData

    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // console.log(this.data);

    this.createForm = this.formBuilder.group({
      firstName: [this.data ? this.data.firstName : null, Validators.required],
      lastName: [this.data ? this.data.lastName : null, Validators.required],
      email: [this.data ? this.data.email : null, [Validators.required, Validators.pattern(this.emailRegx)]],
      major: [null, Validators.required]
    });

    // If the data has some value then assign the major control to the selected value
    // if (this.data.edit) {
      this.createForm.controls['major'].setValue(this.data.major)
    // }

  }

  submit() {
    if (!this.createForm.valid) {
      return;
    }

    // console.log(this.createForm.value);

    /* EDIT STUDENT */

    if (this.data.edit) {
      //Consuming service
      this.studentService.updateStudents(this.data._id, this.createForm.value).subscribe(
        data => {

          // console.log(data);
          this.dialogRef.close();
          this.router.navigate(['/list'], {
            queryParams: {refresh: new Date().getTime()}
          });
          this._snackBar.open('Student Updated!', 'Update', {
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
      
    } else { /* CREATE STUDENT*/
    //Consuming service
    this.studentService.postStudents(this.createForm.value).subscribe(
      data => {

        // console.log(data);
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
}