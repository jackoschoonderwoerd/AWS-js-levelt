import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  loginSubscription = new Subject<boolean>();

  constructor(
    private router: Router
  ) { }

  login(authData) {
    console.log(authData);
    if(authData.name === 'jacko' && authData.password === '123') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    console.log('this.isLoggedIn: ', this.isLoggedIn);
    localStorage.setItem('aws-levelt-logged-in', this.isLoggedIn.toString());
    this.loginSubscription.next(this.isLoggedIn);
    this.router.navigate(['/order-table']);
  }
  getIsLoggedIn() {
    return this.isLoggedIn;
  }
  logOut() {
    this.isLoggedIn = false;
    this.loginSubscription.next(false);
    localStorage.removeItem('aws-levelt-logged-in');
    this.router.navigate(['/home']);
  }
}
