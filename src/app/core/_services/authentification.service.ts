import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private auth: Auth, public router: Router, private error: ErrorService) {
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password))
  }

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
  }


  logout(navig: boolean = true) {
    return signOut(this.auth).then(() => {
      if (navig)
        this.router.navigate(['login']);
    });
  }
}
