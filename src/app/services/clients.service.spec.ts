import { ClientsService } from './clients.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ClientCar,
  ClientsByParams,
  GetClientsByParamsPayload,
  PaginatedClientsResponse,
  ClientData,
  Link,
} from '../interfaces/clientDTOs';

const httpMock = {
  get: jest.fn(),
  post: jest.fn(),
};

jest.mock('@angular/core', () => {
  const actual = jest.requireActual('@angular/core');
  return {
    ...actual,
    inject: (token: any) => {
      if (token === HttpClient) return httpMock;
      return null;
    },
  };
});

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ClientsService();
  });

  describe('getClients', () => {
    it('should call HttpClient.get with correct URL and pagination params', (done) => {
      const mockData: ClientData[] = [
        { id: 1, name: 'Test Client', card_number: '1234' },
      ];

      const mockLinks: Link[] = [
        { url: 'http://example.com?page=1', label: '1', active: true },
      ];

      const mockResponse: PaginatedClientsResponse = {
        current_page: 1,
        data: mockData,
        first_page_url: 'http://example.com?page=1',
        from: 1,
        last_page: 1,
        last_page_url: 'http://example.com?page=1',
        links: mockLinks,
        next_page_url: 'http://example.com?page=1',
        path: 'http://example.com',
        per_page: 10,
        prev_page_url: null,
        to: 1,
        total: 1,
      };

      httpMock.get.mockReturnValue(of(mockResponse));

      service.getClients(1, 10).subscribe((res) => {
        expect(res).toEqual(mockResponse);
        done();
      });

      expect(httpMock.get).toHaveBeenCalledWith(
        `${environment.apiUrl}clients`,
        {
          params: expect.any(Object),
        }
      );

      const params = httpMock.get.mock.calls[0][1].params;
      expect(params.get('page')).toBe('1');
      expect(params.get('per_page')).toBe('10');
    });
  });

  describe('getClientsByParams', () => {
    it('should call HttpClient.post with correct URL and payload', (done) => {
      const payload: GetClientsByParamsPayload = {
        name: 'Anna',
        card_number: '5678',
      };

      const mockResponse: ClientsByParams = {
        id: 1,
        name: 'Anna',
        card_number: '5678',
        car_count: 2,
        service_count: 5,
      };

      httpMock.post.mockReturnValue(of(mockResponse));

      service.getClientsByParams(payload).subscribe((res) => {
        expect(res).toEqual(mockResponse);
        done();
      });

      expect(httpMock.post).toHaveBeenCalledWith(
        `${environment.apiUrl}clients/search`,
        payload
      );
    });
  });

  describe('getClientCars', () => {
    it('should call HttpClient.get with correct URL', (done) => {
      const clientId = 1;

      const mockResponse: ClientCar[] = [
        {
          id: 1,
          client_id: 1,
          car_id: '123456',
          type: 'sedan',
          registered: '2023-01-01',
          ownbrand: false,
          accidents: 1,
          created_at: '2023-01-01',
          updated_at: '2023-01-02',
          latest_service: {
            id: 10,
            car_id: 1,
            log_number: 100,
            event: 'Oil Change',
            event_time: '2023-06-01T10:00:00Z',
            document_id: 'doc123',
          },
        },
      ];

      httpMock.get.mockReturnValue(of(mockResponse));

      service.getClientCars(clientId).subscribe((res) => {
        expect(res).toEqual(mockResponse);
        done();
      });

      expect(httpMock.get).toHaveBeenCalledWith(
        `${environment.apiUrl}clients/${clientId}/cars`
      );
    });
  });
});
