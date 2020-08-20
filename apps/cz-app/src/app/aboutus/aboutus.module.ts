import { AboutusComponent } from './aboutus.component';
import { AboutusRoutingModule } from './aboutus-routing.module';
import { CardModule } from '@mf-app/card';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AboutusComponent],
  imports: [CommonModule, AboutusRoutingModule, CardModule],
})
export class AboutusModule {}
