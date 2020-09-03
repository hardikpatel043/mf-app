import { AboutusComponent } from './aboutus.component';
import { AboutusRoutingModule } from './aboutus-routing.module';
import { CardModule } from '@mf-app/card';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LazyElementsModule } from '@angular-extensions/elements';

@NgModule({
  declarations: [AboutusComponent],
  imports: [CommonModule, AboutusRoutingModule, CardModule, LazyElementsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AboutusModule {}
