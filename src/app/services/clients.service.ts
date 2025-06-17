import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { getPaginationHeaders } from '../helpers/PaginationHelpter';
import {
  ClientCar,
  ClientsByParams,
  GetClientsByParamsPayload,
  PaginatedClientsResponse,
} from '../interfaces/clientDTOs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getClients(pageNumber: number, pageSize: number) {
    let queryParams = getPaginationHeaders(pageNumber, pageSize);
    return this.http.get<PaginatedClientsResponse>(`${this.baseUrl}clients`, {
      params: queryParams,
    });
  }

  getClientsByParams(payload: GetClientsByParamsPayload) {
    return this.http.post<ClientsByParams>(
      `${this.baseUrl}clients/search`,
      payload
    );
  }

  getClientCars(clientId: number) {
    return this.http.get<ClientCar[]>(
      `${this.baseUrl}clients/${clientId}/cars`
    );
  }
}
