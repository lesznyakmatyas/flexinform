import { Routes } from '@angular/router';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'clients',
    component: ClientListComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
