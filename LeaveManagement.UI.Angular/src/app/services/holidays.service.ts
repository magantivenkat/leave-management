import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HolidayModel } from '../models/holiday.model';

@Injectable({ providedIn: 'root' })
export class HolidaysService {
  private url = 'https://localhost:55082/api/holidays';
  constructor(private http: HttpClient) {}

  /** Returns an array of ISO date strings: ["2025-12-25", ...] */
  getHolidays(): Observable<HolidayModel[]> {
    return this.http.get<HolidayModel[]>(this.url);
  }
}
