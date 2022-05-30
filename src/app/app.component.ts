import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthentificationService } from './core/_services/authentification.service';
import { Info } from './core/_services/info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public authFire: Auth, public info: Info, public auth: AuthentificationService, private router: Router) {
  }

  ngOnInit() {
    console.log("init");

    this.authFire.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          console.log(token);
          this.info.bearer = token;
        });
        this.info.uid = user.uid;
        if (user.email)
          this.info.pseudo = user.email
      } else {
        this.router.navigate(['/']);
      }
    })
  }
}
