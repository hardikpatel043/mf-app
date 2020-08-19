import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'aboutus',
    loadChildren: () =>
      import('./aboutus/aboutus.module').then((m) => m.AboutusModule),
  },
  {
    path: 'contactus',
    loadChildren: () =>
      import('./contactus/contactus.module').then((m) => m.ContactusModule),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
