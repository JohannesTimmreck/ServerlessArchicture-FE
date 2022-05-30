import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/_services/authentification.service';
import { ErrorService } from 'src/app/core/_services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false

  hide = true;

  email = new FormControl(undefined, [Validators.required, Validators.email]);
  password = new FormControl(undefined, [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(public auth: AuthentificationService, private router: Router, private error: ErrorService) { }

  ngOnInit(): void { }

  login() {
    this.isLoading = true
    this.auth.login(this.email.value, this.password.value).subscribe({
      next: (value: any) => {
        if (isDevMode()) {
          console.log(value)
        }
        this.isLoading = false;
        this.goTo("")
      },
      error: (err: any) => {
        this.isLoading = false;
        this.error.showError(err)
      }
    })
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
