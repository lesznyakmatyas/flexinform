import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { ClientsComponent } from './clients/clients.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, ClientsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'flexinform';
}
