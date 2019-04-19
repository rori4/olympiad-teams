import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  getStudents(subject) {
    const params = new HttpParams().set('subject', subject);
    return this.http.get(environment.apiUrl + '/students/list', {params: params});
  }

  searchStudents(search) {
    const params = new HttpParams().set('search', search);
    return this.http.get(environment.apiUrl + '/students/search', {params: params});
  }
}
