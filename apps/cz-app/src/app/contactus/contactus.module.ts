import { CommonModule } from '@angular/common';
import { ContactusComponent } from './contactus.component';
import { ContactusRoutingModule } from './contactus-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ContactusComponent],
  imports: [CommonModule, ContactusRoutingModule],
})
export class ContactusModule {}
