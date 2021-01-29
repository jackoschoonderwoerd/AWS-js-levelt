import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { OverviewService } from '../overview.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: string = 'jacko';
  password: string = '123'

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private overviewService: OverviewService
    
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.loginForm = this.fb.group({
      username: new FormControl(null, []),
      password: new FormControl(null, [])
    }) 
  }
  onCancel() {
  
  }
  submit() {
    
  }
}
