import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of, Observable } from 'rxjs';
import { ServerResponse } from '../models/server-response';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getStudentsByTown(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(environment.apiUrl + '/statistics/studentsByTown');
  }

  getTownChartLabels(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '/statistics/townChartLabels');
  }

  getTownChartData(): Observable<number[]> {
    return this.http.get<number[]>(environment.apiUrl + '/statistics/townChartData');

  }
}
