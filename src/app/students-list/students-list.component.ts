import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MatDialog } from '@angular/material/dialog'

import { ModalComponent } from '../modal/modal.component';



// ************************* SERVICES ***********************************
import { StudentService } from '../services/student.service';
// ************************* SERVICES ***********************************


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['firstName', 'lastName', 'major', 'email'];

  dataSource = new MatTableDataSource<StudentElement>();
  // dataSource: MatTableDataSource<StudentElement>;



  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private studentService: StudentService, 
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {


  }

    /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  
  
  ngOnInit(): void {
    this.getStudents();
    // setTimeout(() => this.dataSource.sort = this.sort);
    // setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(()=>{
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 1000);

    // Refreshing component from modal
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      const refresh = paramMap.get('refresh');
      if (refresh) {
        this.getStudents()
        setTimeout(()=>{
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 1000);
      }
    });

  }

  getStudents(){


    //Consuming service
    this.studentService.getStudents().subscribe(
      data => {

        this.dataSource = new MatTableDataSource(data);

      }, 
      
      error => {   
        console.log(error)
      });
    //Consuming service
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: {}
    });
  }


}


export interface StudentElement {
  firstName: string;
  lastName: string;
  major: string;
  email: string;
}
