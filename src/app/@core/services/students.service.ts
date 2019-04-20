import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/server-response';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  getStudents(subject) {
    const params = new HttpParams().set('subject', subject);
    return this.http.get(environment.apiUrl + '/students/list', {params: params});
  }

  getResults(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(environment.apiUrl + '/students/results');
  }

  searchStudents(search) {
    const params = new HttpParams().set('search', search);
    return this.http.get(environment.apiUrl + '/students/search', {params: params});
  }
}
