import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../core/reservation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  stats: any = {};

  roomNumber = '';
  roomStatus: any = null;

  reservationNumber = '';
  reservation: any = null;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {

    this.reservationService.getDashboardStats()
      .subscribe(res => {
        this.stats = res;
      });

  }

  checkRoom() {

    this.reservationService.checkRoomStatus(Number(this.roomNumber))
      .subscribe(res => {
        this.roomStatus = res;
      });

  }

  searchReservation() {

    this.reservationService.getReservationById(Number(this.reservationNumber))
      .subscribe(res => {
        this.reservation = res;
      });

  }

  cancelReservation() {

    if (!confirm("Cancel this reservation?")) return;

    this.reservationService.cancelReservation(this.reservation.id)
      .subscribe(() => {

        alert("Reservation cancelled");

        this.reservation = null;

        this.loadStats();

      });

  }

}