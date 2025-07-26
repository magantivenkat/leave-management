import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../models/leave-request.model';

@Injectable({ providedIn: 'root' })
export class LeaveRequestService {
  private apiUrl = 'https://localhost:55082/api/LeaveRequests';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  get(id: number): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  getMy(userId: number): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.apiUrl}/my/${userId}`, { headers: this.headers });
  }

  // getTeam(userIds: number[]): Observable<LeaveRequest[]> {
  //   return this.http.get<LeaveRequest[]>(`${this.apiUrl}/team?` + userIds.map(id => `userIds=${id}`).join('&'));
  // }

  create(req: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.apiUrl, req, { headers: this.headers });
  }

  update(req: LeaveRequest): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.apiUrl}/${req.id}`, req);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTeam(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.apiUrl}/team`, { headers: this.headers });
  }

  updateStatus(id: number, status: 'Approved' | 'Rejected'): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.apiUrl}/${id}/status`, { status } as LeaveRequest, { headers: this.headers });
  }
}