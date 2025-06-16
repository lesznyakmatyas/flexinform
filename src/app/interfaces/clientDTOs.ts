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
