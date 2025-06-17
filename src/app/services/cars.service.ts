import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CarService } from '../interfaces/carServiceDTOs';

@Injectable({
  providedIn: 'root',
})
export class CarssService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getCarServices(clientId: number, carId: number) {
    return this.http.get<CarService[]>(
      `${this.baseUrl}clients/${clientId}/cars/${carId}/services`
    );
  }
}
