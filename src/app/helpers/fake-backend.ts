import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        switch (true) {
            case (request.url.endsWith('/api/authenticate') && request.method === 'POST'): {
                // tslint:disable-next-line: prefer-const
                let body = JSON.parse(request.body);

                if (body.email === 'rajanarora028@gmail.com' && body.password === '1234') {
                    return this.ok({
                        // tslint:disable-next-line: max-line-length
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJhamFuIEFyb3JhIiwiYWRtaW4iOnRydWV9.YvcHJ2RHe5MkExWScsKcFzap2jda7bsNbNHdU822y1k'
                    }).pipe(delay(1000));
                } else {
                    return this.badRequest();
                }
            }

            case (request.url.endsWith('/api/orders') && request.method === 'GET'): {
                if (this.isLoggedIn(request.headers)) {
                    return this.ok([1, 2, 3]).pipe(delay(1000));
                } else {
                    return this.unauthorized();
                }
            }

            default:
                return next.handle(request);
        }
    }

    ok(body?) {
        return of(new HttpResponse({status: 200, body}));
    }

    badRequest() {
        return of(new HttpResponse({status: 400}));
    }

    unauthorized() {
        return of(new HttpResponse({status: 401}));
    }

    isLoggedIn(headers: HttpHeaders) {
        // tslint:disable-next-line: max-line-length
        return headers.get('Authorization') === 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJhamFuIEFyb3JhIiwiYWRtaW4iOnRydWV9.YvcHJ2RHe5MkExWScsKcFzap2jda7bsNbNHdU822y1k';
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};

// https://jasonwatmore.com/post/2020/03/10/angular-8-fake-backend-example-for-backendless-development

