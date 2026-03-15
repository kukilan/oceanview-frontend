import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  getAvailableRooms(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/available-rooms`, data);
  }

  calculateReservation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/calculate`, data);
  }

  createReservation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  getReservations(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getReservationById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  cancelReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getInvoice(id: number) {
    return this.http.get(
      `${this.apiUrl}/invoice/${id}`,
      { responseType: 'blob' }
    );
  }

  checkRoomStatus(roomNumber: number) {
    return this.http.get(`${this.apiUrl}/room-status/${roomNumber}`);
  }
  getDashboardStats() 
  {
  return this.http.get<any>('http://localhost:8080/api/dashboard/stats');
  }
}