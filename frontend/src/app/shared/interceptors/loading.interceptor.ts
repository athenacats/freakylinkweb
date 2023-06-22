/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

let pendingRequest = 0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoading();
    pendingRequest = pendingRequest + 1;
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            this.handleHideLoading();
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error: (_) => {
          this.handleHideLoading();
        },
      })
    );
  }
  handleHideLoading() {
    pendingRequest = pendingRequest - 1;
    if (pendingRequest === 0) this.loadingService.hideLoading();
  }
}
