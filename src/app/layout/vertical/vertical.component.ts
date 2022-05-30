import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class VerticalComponent implements OnInit, OnDestroy {

  list: any[] = [
    { route: '/upload', name: 'Upload File' },
    { route: '/image', name: 'See File' }
  ]

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

}
