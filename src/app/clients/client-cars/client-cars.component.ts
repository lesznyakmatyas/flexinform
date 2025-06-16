import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ClientCar } from '../../interfaces/clientDTOs';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client-cars',
  imports: [],
  templateUrl: './client-cars.component.html',
  styleUrl: './client-cars.component.css',
})
export class ClientCarsComponent implements OnInit {
  clientsService = inject(ClientsService);
  clientId = input.required<number>();
  clientCars = signal<ClientCar[]>([]);

  ngOnInit(): void {
    this.fetchClientCars();
  }

  fetchClientCars() {
    this.clientsService.getClientCars(this.clientId()).subscribe({
      next: (data) => this.clientCars.set(data),
    });
  }
}
