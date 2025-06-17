import { getPaginationHeaders } from './PaginationHelpter';

describe('getPaginationHeaders', () => {
  it('should return HttpParams with page and per_page when both values are provided', () => {
    const params = getPaginationHeaders(2, 20);

    expect(params.get('page')).toBe('2');
    expect(params.get('per_page')).toBe('20');
  });

  it('should return empty HttpParams when pageNumber is 0', () => {
    const params = getPaginationHeaders(0, 20);

    expect(params.get('page')).toBeNull();
    expect(params.get('per_page')).toBeNull();
  });

  it('should return empty HttpParams when pageSize is 0', () => {
    const params = getPaginationHeaders(2, 0);

    expect(params.get('page')).toBeNull();
    expect(params.get('per_page')).toBeNull();
  });

  it('should return empty HttpParams when both values are missing', () => {
    const params = getPaginationHeaders(0, 0);

    expect(params.keys().length).toBe(0);
  });
});
