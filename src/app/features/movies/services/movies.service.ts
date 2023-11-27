import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Injectable()
export class MovieService {

  routes = {
    movies: 'https://tools.texoit.com/backend-java/api/movies',
  }

  constructor(private http: HttpClient) { }

  get(params: any): Observable<any> {
    return this.http.get<any>(`${this.routes.movies}`, { params: params }).pipe(take(1));
  }
}
