import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, MatCardModule, FlexLayoutModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
