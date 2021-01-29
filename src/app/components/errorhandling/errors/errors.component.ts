import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { OverviewService } from '../../overview/overview.service';

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
    private overviewService: OverviewService  
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
    this.overviewService.loginStatusChanged.emit(false);
    this.router.navigate(['/home']);
  }
}
