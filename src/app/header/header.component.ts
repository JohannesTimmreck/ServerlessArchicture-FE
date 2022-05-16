import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentificationService } from '../_services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  profil: boolean = false
  admin: boolean = false

  saveSub: Subscription

  constructor(private router: Router, public auth: AuthentificationService) {
    this.check(router.url)

    this.saveSub = router.events.subscribe({
      next: (event) => {

        if (event instanceof NavigationEnd) {
          this.check(event.urlAfterRedirects)
        }

      }
    });
  }

  logout() {
    this.auth.logout()
  }

  check(url: string) {
    if (url.split('?')[0] === '/profil') {
      this.profil = true;
    } else {
      this.profil = false;
    }

    if (url.split('?')[0] === '/admin') {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  ngOnDestroy(): void {
    this.saveSub.unsubscribe()
  }

  ngOnInit(): void {
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

}
