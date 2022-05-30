import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { AuthentificationService } from '../../core/_services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() closeMenu = new EventEmitter<void>();

  constructor(public authFire: Auth, public auth: AuthentificationService, private router: Router, public dialog: MatDialog) { }

  connected: boolean = false
  email: string = ""

  ngOnInit(): void {
    this.authFire.onAuthStateChanged((user) => {
      if (user) {
        this.connected = true
        if (user.email)
          this.email = user.email
      } else {
        this.connected = false
        this.email = ""
      }
    })
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

  openCloseMenu() {
    this.closeMenu.emit()
  }

  logout() {
    this.auth.logout()
  }

}
