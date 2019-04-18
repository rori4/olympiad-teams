import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ServerResponse } from './../models/server-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id): Observable<ServerResponse> {
    const params = new HttpParams().set('id', id);
    return this.http.get<ServerResponse>(environment.apiUrl + '/users/profile', { params: params });
  }

  addResult(id, result): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(environment.apiUrl + '/users/result', { userId: id, result });
  }
}
