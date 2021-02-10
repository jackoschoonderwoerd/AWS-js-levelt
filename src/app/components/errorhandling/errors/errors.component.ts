import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyError } from 'src/app/models/my-error.model';
import { ErrorService } from '../error.service';



@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  error: MyError;
  showDetails: boolean = false;

  constructor(
    private router: Router,
    private errorService: ErrorService
  ) 
  {
    // if(this.router.getCurrentNavigation().extras.state.error) {
    //   this.error = JSON.parse(this.router.getCurrentNavigation().extras.state.error);
    //   console.log(this.error);
    // }
   }

  ngOnInit(): void {
    this.errorService.errorSubject.subscribe((error: MyError) => {
      console.log(error)
    })
    if(history.state.error) {
      this.error = history.state.error
      console.log(this.error.message)
    }
  }
}
