import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  openedDrawer: boolean = true

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
