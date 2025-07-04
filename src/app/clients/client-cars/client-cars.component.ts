import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ClientCar } from '../../interfaces/clientDTOs';
import { ClientsService } from '../../services/clients.service';
import { CarServicesComponent } from '../../car-services/car-services.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-client-cars',
  imports: [CarServicesComponent, NgStyle],
  templateUrl: './client-cars.component.html',
  styleUrl: './client-cars.component.css',
})
export class ClientCarsComponent implements OnInit {
  clientsService = inject(ClientsService);
  private destroyRef = inject(DestroyRef);
  clientId = input.required<number>();
  clientCars = signal<ClientCar[]>([]);
  selectedCarId?: number;

  ngOnInit(): void {
    this.fetchClientCars();
  }

  fetchClientCars() {
    const subscription = this.clientsService
      .getClientCars(this.clientId())
      .subscribe({
        next: (data) => this.clientCars.set(data),
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  selectCar(carId: number) {
    this.selectedCarId = carId;
  }
}
