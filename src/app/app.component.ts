import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tiicot-test-app';
  isActive = true;



  constructor(private router: Router){}


  ngOnInit() {
    this.router.navigate(['/list'])
  }


}
