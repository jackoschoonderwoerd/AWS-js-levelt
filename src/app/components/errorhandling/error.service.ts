import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MyError } from 'src/app/models/my-error.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  errorSubject = new Subject<Error>()

  constructor(
    private router: Router
  ) { }

  reportError(error: Error) {
    this.router.navigate(['/error', {error: error}])
  }
}
