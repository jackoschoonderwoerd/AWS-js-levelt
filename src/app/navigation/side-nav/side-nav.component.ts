import { Component, OnInit } from '@angular/core';
import { OverviewService } from 'src/app/components/overview/overview.service';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/user-info.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  mobileNavStatus = false;

  loginStatus: boolean = false;
  username: string = '';

  constructor(

    private overviewService: OverviewService,
    private router: Router,
    
  ) { }

  ngOnInit() {
    this.overviewService.getLogInStatus();
    // this.username = this.userInfo.username;
    // this.loginStatus = this.userInfo.loginStatus;
    this.overviewService.loginStatusChanged.subscribe((userInfo: UserInfo) => {
      this.loginStatus = userInfo.loginStatus;
      this.username = userInfo.username;
    });
  }
  toggle() {
    console.log('side-nav.component.ts: toggle()')
    this.mobileNavStatus = !this.mobileNavStatus;
  }
  onLogOut() {
    this.overviewService.logOut();
  }
}
