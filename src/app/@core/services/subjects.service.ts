import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ServerResponse } from './../models/server-response';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor(private http: HttpClient) {}

  getSubjects(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(environment.apiUrl + '/subjects/list');
  }

  addSubject(data): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(environment.apiUrl + '/subjects/add', data);
  }
}
