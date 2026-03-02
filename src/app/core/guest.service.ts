import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private apiUrl = 'http://localhost:8080/api/guests';

  constructor(private http: HttpClient) {}

  searchGuest(value: string) {
    return this.http.get<any>(`${this.apiUrl}/search?value=${value}`);
  }

  createGuest(data: any) {
    return this.http.post(this.apiUrl + '/create', data);
  }

  updateGuest(id: number, data: any) {
    return this.http.put(this.apiUrl + '/' + id, data);
  }
}