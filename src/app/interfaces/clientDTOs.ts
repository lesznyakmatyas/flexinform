export interface PaginatedClientsResponse {
  current_page: number;
  data: ClientData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface ClientData {
  id: number;
  name: string;
  card_number: string;
}

export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface ClientCar {
  id: number;
  client_id: number;
  car_id: string;
  type: string;
  registered: string;
  ownbrand: boolean;
  accidents: number;
  created_at: string;
  updated_at: string;
  latest_service?: LatestService;
}

export interface LatestService {
  id: number;
  car_id: number;
  log_number: number;
  event: string;
  event_time: string;
  document_id: string;
}

export interface ClientsByParams {
  id: number;
  name: string;
  card_number: string;
  car_count: number;
  service_count: number;
}

export interface GetClientsByParamsPayload {
  name: string;
  card_number: string;
}
