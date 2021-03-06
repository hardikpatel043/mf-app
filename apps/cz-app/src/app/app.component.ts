import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { Subscription } from 'rxjs';

@Component({
  selector: 'mf-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  mediaSub: Subscription;
  deviceXs: boolean;
  newVar = 'hardik a patel new';
  constructor(public mediaObserver: MediaObserver) {}
  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === 'xs' ? true : false;
    });
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
