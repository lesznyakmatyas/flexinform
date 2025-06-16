import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CarssService } from '../services/cars.service';
import { CarService } from '../interfaces/carServiceDTOs';

@Component({
  selector: 'app-car-services',
  imports: [],
  templateUrl: './car-services.component.html',
  styleUrl: './car-services.component.css',
})
export class CarServicesComponent implements OnInit {
  carssService = inject(CarssService);
  clientId = input.required<number>();
  carId = input.required<number>();
  registered = input.required<string>();
  carServices = signal<CarService[]>([]);

  ngOnInit(): void {
    this.fetchClientCars();
  }

  fetchClientCars() {
    this.carssService.getCarServices(this.clientId(), this.carId()).subscribe({
      next: (data) => this.carServices.set(data),
    });
  }
}
