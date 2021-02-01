import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'aws-levelt';

  constructor(
    private authService: AuthService
  ) {

  }
  ngOnInit() {
    setTimeout(() => {
      if(localStorage.getItem('aws-levelt-logged-in') === 'true') {
        console.log('isLoggedIn')
        this.authService.loginSubscription.next(true)
      } else {
        console.log('is not logged in');
      }
    });
    
  }
}
