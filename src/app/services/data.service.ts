import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

export class DataService {

  constructor(private url: string, private httpClient: HttpClient) {  }

  getAll() {
    return this.httpClient.get<any>(this.url)
        .pipe(
            map(response => response),
            catchError(this.handleError)
        );
  }

  create(resource) {
    return this.httpClient.post<any>(this.url, JSON.stringify(resource))
        .pipe(
            map(response => response),
            catchError(this.handleError)
        );
  }

  update(resource) {
    return this.httpClient.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true}))
        .pipe(
            map(response => response),
            catchError(this.handleError)
        );
  }

  delete(id) {
    return this.httpClient.delete(this.url + '/' + id )
        .pipe(
            map(response => response),
            catchError(this.handleError)
        );
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput(error));
    }

    if (error.status === 404) {
      return throwError(new NotFoundError());
    }

    return throwError(new AppError(error));
  }
}
