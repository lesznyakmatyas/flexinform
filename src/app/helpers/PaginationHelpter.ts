import { HttpParams } from '@angular/common/http';

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let queryParams = new HttpParams();

  if (pageNumber && pageSize) {
    queryParams = queryParams.append('page', pageNumber);
    queryParams = queryParams.append('per_page', pageSize);
  }

  return queryParams;
}
