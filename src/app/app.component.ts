import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentificationService } from './_services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  loginRegister = true;

  saveSub: Subscription

  constructor(private router: Router) {
    this.check(router.url)

    this.saveSub = router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          this.check(event.urlAfterRedirects)
        }
      }
    });
  }

  check(url: string) {
    if (url.split('?')[0] === '/login' || url.split('?')[0] === '/register' || url.split('?')[0] === '/forgot_password' || url.split('?')[0] === '/reset_forgot_password') {
      this.loginRegister = true;
    } else {
      this.loginRegister = false;
    }
  }

  ngOnDestroy(): void {
    this.saveSub.unsubscribe()
  }
}
