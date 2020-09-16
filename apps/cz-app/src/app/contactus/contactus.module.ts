import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ContactusComponent } from './contactus.component';
import { ContactusRoutingModule } from './contactus-routing.module';
import { LazyElementsModule } from '@angular-extensions/elements';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ContactusComponent],
  imports: [
    CommonModule,
    ContactusRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    LazyElementsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContactusModule {}
