import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/auth/auth.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  mobileNavStatus = false;

  loginStatus: boolean = false;
  username: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.loginSubscription.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn
    })
  }

  toggle() {
    console.log('side-nav.component.ts: toggle()')
    this.mobileNavStatus = !this.mobileNavStatus;
  }

  onTypeSelected(type) {
    this.router.navigate(['/order-item', {type: type}])
  }
}
