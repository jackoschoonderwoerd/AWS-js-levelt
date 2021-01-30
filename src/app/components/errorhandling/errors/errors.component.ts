import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  error;
  showDetails: boolean = false;

  constructor(
    private router: Router,
  ) 
  {
    // if(this.router.getCurrentNavigation().extras.state.error) {
    //   this.error = JSON.parse(this.router.getCurrentNavigation().extras.state.error);
    //   console.log(this.error);
    // }
   }

  ngOnInit(): void {
  }

  onErrorDetails() {
    this.showDetails = !this.showDetails;
  }
  onHome() {

    this.router.navigate(['/home']);
  }
}
