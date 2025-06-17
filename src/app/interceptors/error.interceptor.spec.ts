import {
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { errorInterceptor } from './error.interceptor';

jest.mock('@angular/core', () => {
  const actual = jest.requireActual('@angular/core');
  return {
    ...actual,
    inject: (token: any) => {
      if (token === Router) return mockRouter;
      if (token === ToastrService) return mockToastr;
      return null;
    },
  };
});

const mockToastr = {
  error: jest.fn(),
};

const mockRouter = {
  navigate: jest.fn(),
};

describe('errorInterceptor', () => {
  let request: HttpRequest<any>;

  beforeEach(() => {
    request = new HttpRequest('GET', '/test');
    jest.clearAllMocks();
  });

  it('should show 404 error via toastr', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      error: { error: 'Not found' },
    });

    // HttpHandlerFn = (req) => Observable<HttpEvent<any>>
    const handler = jest.fn().mockReturnValue(throwError(() => errorResponse));

    errorInterceptor(request, handler).subscribe({
      error: () => {
        expect(mockToastr.error).toHaveBeenCalledWith('Not found', 404);
        done();
      },
    });
  });

  it('should show default error message for other status codes', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      error: 'Internal server error',
    });

    const handler = jest.fn().mockReturnValue(throwError(() => errorResponse));

    errorInterceptor(request, handler).subscribe({
      error: () => {
        expect(mockToastr.error).toHaveBeenCalledWith('Something went wrong!');
        done();
      },
    });
  });

  it('should not call toastr.error when request succeeds', (done) => {
    const handler = jest.fn().mockReturnValue(of({} as HttpEvent<any>));

    errorInterceptor(request, handler).subscribe({
      next: () => {
        expect(mockToastr.error).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
