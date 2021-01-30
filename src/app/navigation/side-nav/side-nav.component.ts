import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


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

    
    private router: Router,
    
  ) { }

  ngOnInit() {



  }

  toggle() {
    console.log('side-nav.component.ts: toggle()')
    this.mobileNavStatus = !this.mobileNavStatus;
  }
  onLogOut() {

  }
}
