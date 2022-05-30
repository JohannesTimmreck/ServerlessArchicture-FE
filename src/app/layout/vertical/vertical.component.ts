import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})
export class VerticalComponent implements OnInit, OnDestroy {

  list: any[] = []

  //sub: Subscription

  constructor(private router: Router) {
    /* this.sub = this.topicsService.currentTopicsSubject.subscribe({
      next: (values: any[]) => {
        if (values) {
          this.list = values.map((value: any) => {
            if (value.name === "Logement") {
              value.icon = 'house'
            } else if (value.name === "Finance") {
              value.icon = 'attach_money'
            } else {
              value.icon = 'house'
            }
            return value
          })
        }
      }
    }) */
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //this.sub.unsubscribe()
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

}
