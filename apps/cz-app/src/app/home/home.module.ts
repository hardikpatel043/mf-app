import { CommonModule } from '@angular/common';
import { LazyElementsModule } from '@angular-extensions/elements';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, LazyElementsModule],
  exports: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
