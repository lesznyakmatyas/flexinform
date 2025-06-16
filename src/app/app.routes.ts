import { Routes } from '@angular/router';
import { ClientListComponent } from './clients/client-list/client-list.component';

export const routes: Routes = [
  {
    path: 'clients',
    component: ClientListComponent,
  },
];
