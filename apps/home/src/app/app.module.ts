import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';

import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from '@mf-app/card';
import { RouterModule } from '@angular/router';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CardModule,
    RouterModule.forRoot([]),
    AgGridModule.withComponents([]),
  ],
  providers: [],
  entryComponents: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const elm = createCustomElement(AppComponent, { injector: this.injector });
    if (!customElements.get('mf-home')) {
      customElements.define('mf-home', elm);
    }
  }
}
