import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/server-response';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  addUser(data) {
    return this.http.post(environment.apiUrl + '/admin/add-user', data);
  }

  getUser(id): Observable<ServerResponse> {
    const params = new HttpParams().set('id', id);
    return this.http.get<ServerResponse>(environment.apiUrl + '/admin/user', { params: params });
  }
}
